import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { HashService } from '@/services/hash.service';
// import { MailTemplateService } from '@/services/mail-template.service';
// import { SendMailService } from '@/services/sendmail.service';
// import { State, StateSchema } from './entities/state-entity';
import { Lead, LeadSchema } from './entitites/lead-entity';
// import { StateRepository } from './repository/state-repository';
import { LeadRepository } from './repository/lead-repository';
// import { UserServices } from './services/user-services';
// import { StateFactoryService } from './services/state-factory-service';
import { LeadController } from './controllers/lead.controller';
import { S3FileStorageService } from '@/services/s3.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LeadServices } from './services/lead-services';
// import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('jwt.secret'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
    // forwardRef(() => AuthModule),
  ],
  providers: [
    LeadServices,
    LeadRepository,
    S3FileStorageService,
    // HashService,
    // UserServices,
    // MailTemplateService,
    // SendMailService,
    // StateRepository,
    // StateFactoryService,
  ],
  controllers: [LeadController],
  exports: [LeadRepository],
})
export class LeadsModule {}
