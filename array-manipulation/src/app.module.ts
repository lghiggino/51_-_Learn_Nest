import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManipulatorsModule } from './manipulators/manipulators.module';

@Module({
  imports: [ManipulatorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
