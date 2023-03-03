import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Lead, LeadDocument } from '../entitites/lead-entity';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateLeadDTO } from '../dto/update-lead-dto';
import { CreateLeadDTO } from '../dto/create-lead-dto';

@Injectable()
export class LeadRepository {
  constructor(
    @InjectModel(Lead.name)
    private readonly model: Model<LeadDocument>,
  ) {}

  async findAll(): Promise<Lead[]> {
    const leads = await this.model.find().exec();
    if (leads.length > 0) {
      const leadsList: Lead[] = [];
      for (const lead of leads) {
        const jsonData = lead.toJSON();
        leadsList.push(jsonData);
      }
      return leadsList;
    }

    return leads;
  }

  async findById(id: string): Promise<Lead> {
    const lead = await this.model.findById(id).exec();
    const jsonData = lead.toJSON();
    return jsonData;
  }

  async findByCnpj(cnpj: string): Promise<Lead> {
    const lead = await this.model
      .findOne({
        cnpj,
      })
      .exec();

    if (lead) {
      const jsonData = lead.toJSON();
      return jsonData;
    }

    return undefined;
  }

  async createClient(lead: CreateLeadDTO): Promise<Lead> {
    const createdLead = new this.model(lead);
    const result = await createdLead.save();
    const jsonData = result.toJSON();
    return jsonData;
  }

  async updateLead(cnpj: string, lead: UpdateLeadDTO): Promise<Lead> {
    const updatedClient = await this.model
      .findOneAndUpdate({ cnpj }, lead, { new: true })
      .exec();
    const jsonData = updatedClient.toJSON();
    return jsonData;
  }
}
