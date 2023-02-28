import { FileUploadResponse } from '@/models/file-upload-response';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateShallowLeadDTO } from '../dto/create-shallow-lead-dto';
import { CreateLeadDTO } from '../dto/create-lead-dto';
import { FileUploadDTO } from '../dto/file-upload-dto';
import { UpdateLeadDTO } from '../dto/update-lead-dto';
import { Lead } from '../entitites/lead-entity';
import { LeadServices } from '../services/lead-services';

interface RequestData {
  lead: {
    id: string;
    name: string;
    email: string;
  };
}

@ApiTags('lead')
@ApiInternalServerErrorResponse()
@Controller('api')
export class LeadController {
  constructor(private readonly leadService: LeadServices) {}

  @ApiCreatedResponse({
    description: 'Register new company lead',
    type: FileUploadResponse,
  })
  @ApiBadRequestResponse({ description: 'An error ocurred on create new lead' })
  @Post('/register/lead')
  async registerLeadClient(@Body() body: CreateShallowLeadDTO) {
    const lead = await this.leadService.createLeadClient(body);
    return lead;
  }

  @ApiCreatedResponse({ description: 'Send company document file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDTO,
  })
  @UseInterceptors(FileInterceptor('document'))
  @Post('/document/upload')
  async uploadleadPrescription(@UploadedFile() file: Express.Multer.File) {
    const uploadedFile = await this.leadService.uploadLeadDocument(file);
    return uploadedFile;
  }

  @ApiOkResponse({ description: 'Update lead informations', type: Lead })
  @ApiBadRequestResponse({
    description: 'An error ocurred on update lead informations',
  })
  // @ApiBearerAuth()
  @Put('/update/lead')
  async updateLeadClient(
    @Request() req: RequestData,
    @Body() body: UpdateLeadDTO,
  ) {
    const lead = await this.leadService.updateLead(req.lead.id, body);
    return lead;
  }

  @ApiOkResponse({ description: 'Get lead informations', type: Lead })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  // @ApiBearerAuth()
  @Get('/lead/data')
  async getLeadData(@Request() req: RequestData) {
    const leadData = await this.leadService.getLeadData(req.lead.id);
    return leadData;
  }
}
