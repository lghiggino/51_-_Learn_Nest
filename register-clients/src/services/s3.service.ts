import { FileUploadResponse } from '@/models/file-upload-response';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

type PutOptionParams = {
  path: string;
  fileOriginalName: string;
  file: Express.Multer.File;
};

@Injectable()
export class S3FileStorageService {
  private readonly logger = new Logger(S3FileStorageService.name);

  constructor(private readonly config: ConfigService) {}

  private getS3Config() {
    const s3 = new S3({
      apiVersion: '2006-03-01',
      region: this.config.getOrThrow('aws.region'),
      credentials: {
        accessKeyId: this.config.getOrThrow<string>('aws.accesskey'),
        secretAccessKey: this.config.getOrThrow<string>('aws.secretkey'),
      },
    });
    return s3;
  }

  async sendFile(
    path: string,
    file: Express.Multer.File,
  ): Promise<FileUploadResponse> {
    try {
      const s3 = this.getS3Config();

      this.logger.debug('(sendFile) trying sending file...');
      const result = await s3
        .upload({
          Bucket: this.config.getOrThrow<string>('aws.s3.bucket'),
          Body: file.buffer,
          Key: `${path}/${Date.now()}-${file.originalname}`,
          ContentType: file.mimetype,
          ACL: 'public-read',
        })
        .promise();

      this.logger.log(`(sendFile) file sending: buffer[${file.originalname}]`);
      this.logger.debug({
        file_url: result.Location,
        originalname: result.Key,
      });

      return {
        file_url: result.Location,
        originalname: result.Key,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  async deleteObject(fileOriginalName: string) {
    try {
      const s3 = this.getS3Config();
      const params = {
        Bucket: this.config.getOrThrow('aws.s3.bucket'),
        Key: fileOriginalName,
      };

      this.logger.debug('(deleteObject) trying delete object...');
      await s3.deleteObject(params).promise();

      this.logger.log(' (deleteObject) Object deleted with success');
      this.logger.debug(`(deleteObject) object: ${fileOriginalName}`);
    } catch (error) {
      this.logger.error(`(deleteObject) ${error}`);
    }
  }

  async putObject({
    file,
    fileOriginalName,
    path,
  }: PutOptionParams): Promise<FileUploadResponse> {
    try {
      const s3 = this.getS3Config();

      this.logger.log(`(putObject) deleting file ${fileOriginalName}`);
      this.logger.debug('(putObject) trying delete file object from S3...');
      await this.deleteObject(fileOriginalName);
      this.logger.debug('(putObject) file deleting success');

      this.logger.debug('(putObject) trying update object file on S3...');
      const result = await s3
        .upload({
          Bucket: this.config.getOrThrow('aws.s3.bucket'),
          Key: `${path}/${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();
      this.logger.debug('(putObject) file update success');
      this.logger.debug({
        file_url: result.Location,
        originalname: result.Key,
      });

      return {
        file_url: result.Location,
        originalname: result.Key,
      };
    } catch (error) {
      this.logger.error(`(putObject) ${error}`);
    }
  }

  async sendPrescription(
    file: Express.Multer.File,
  ): Promise<FileUploadResponse> {
    try {
      const s3 = this.getS3Config();

      this.logger.debug('(sendFile) trying sending file...');
      const result = await s3
        .upload({
          Bucket: this.config.getOrThrow<string>('aws.s3.bucket'),
          Body: file.buffer,
          Key: `prescriptions/prescription-${Date.now()}-${file.originalname}`,
          ContentType: file.mimetype,
          ACL: 'public-read',
        })
        .promise();

      this.logger.log(`(sendFile) file sending: buffer[${file.originalname}]`);
      this.logger.debug({
        file_url: result.Location,
        originalname: result.Key,
      });

      return {
        file_url: result.Location,
        originalname: result.Key,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
