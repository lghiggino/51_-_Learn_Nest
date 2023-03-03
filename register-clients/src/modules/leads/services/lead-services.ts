import { S3FileStorageService } from '@/services/s3.service';
// TODO serviço de ativação da conta suspenso
/* import { MailTemplateService } from '@/services/mail-template.service';
import { SendMailService } from '@/services/sendmail.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'; */
import { Injectable, Logger } from '@nestjs/common';
import { CreateLeadDTO } from '../dto/create-lead-dto';
import { CreateShallowLeadDTO } from '../dto/create-shallow-lead-dto';
import { UpdateLeadDTO } from '../dto/update-lead-dto';
import { LeadAlreadyExistsException } from '../errors/lead-already-exists.exception';
import { LeadNotFoundException } from '../errors/lead-not-found-exception';
import { LeadRepository } from '../repository/lead-repository';

@Injectable()
export class LeadServices {
  private readonly logger = new Logger(LeadServices.name);

  constructor(
    private readonly leadRepository: LeadRepository,
    private readonly s3Service: S3FileStorageService,
  ) {}

  async createLeadClient(lead: CreateShallowLeadDTO) {
    try {
      const leadAlreadyExists = await this.leadRepository.findByCnpj(lead.cnpj);

      if (leadAlreadyExists) {
        this.logger.log('Should forward the lead to the deeplink');
        this.logger.debug(
          `Lead with cnpj[${leadAlreadyExists.cnpj}] already exists`,
        );
        throw new LeadAlreadyExistsException();
      }

      const incrementedLead: CreateLeadDTO = {
        ...lead,
        companySize: '',
        annualRevenue: '',
        legalName: '',
        fantasyName: '',
        biometricDocument: '',
        documents: [
          {
            name: '',
            status: '',
          },
        ],
        address: [
          {
            zipcode: '',
            country: '',
            city: '',
            uf: '',
            street: '',
            number: '',
            district: '',
            complement: '',
          },
        ],
        associate: [
          {
            cpf: '',
            fullName: '',
            socialName: '',
            birthDate: '',
            phone: '',
            motherName: '',
            occupation: '',
            monthlyIncome: '',
            pepLevel: '',
            address: [
              {
                zipcode: '',
                country: '',
                city: '',
                uf: '',
                street: '',
                number: '',
                district: '',
                complement: '',
              },
            ],
          },
        ],
        registerStatus: this.setCurrentStatus('created'),
        registerStatusHistory: [this.setStatusHistory('created')],
      };

      const createdLead = await this.leadRepository.createClient(
        incrementedLead,
      );

      return createdLead;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private setStatusHistory(statusValue: string) {
    return {
      status: statusValue,
      date: new Date().toISOString(),
    };
  }

  private setCurrentStatus(statusValue: string) {
    return statusValue;
  }

  async updateLead(cnpj: string, lead: UpdateLeadDTO) {
    try {
      const leadExists = await this.leadRepository.findByCnpj(cnpj);

      if (!leadExists) {
        this.logger.log('[updateClient] Usuário não encontrado');
        this.logger.debug(
          `[updateClient] não foi possível encontrar usuário com cnpj[${cnpj}]`,
        );
        throw new LeadNotFoundException();
      }

      const newLead = {
        cnpj: leadExists.cnpj,
        registerStatus: this.setCurrentStatus('added company data'),
        registerStatusHistory: leadExists.registerStatusHistory.concat(
          this.setStatusHistory('added company data'),
        ),
        ...lead,
      };

      const updatedLead = await this.leadRepository.updateLead(
        leadExists.cnpj,
        newLead,
      );

      return updatedLead;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getLeadData(id: string) {
    try {
      const lead = await this.leadRepository.findById(id);

      if (!lead) {
        throw new LeadNotFoundException();
      }

      return lead;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async uploadLeadDocument(file: Express.Multer.File) {
    try {
      const bucketResponse = await this.s3Service.sendPrescription(file);
      return bucketResponse;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
