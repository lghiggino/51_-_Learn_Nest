import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
// import { UsersModule } from './modules/users/users.module';
import environments from '@/config/environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environments],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.getOrThrow<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    // UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
