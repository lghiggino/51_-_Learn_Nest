import { ApiResponseProperty } from '@nestjs/swagger';

export class FileUploadResponse {
  @ApiResponseProperty()
  file_url: string;
  @ApiResponseProperty()
  originalname: string;
}
