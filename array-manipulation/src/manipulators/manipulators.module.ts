import { Module } from '@nestjs/common';
import { ManipulatorsService } from './manipulators.service';

@Module({
  providers: [ManipulatorsService]
})
export class ManipulatorsModule {}
