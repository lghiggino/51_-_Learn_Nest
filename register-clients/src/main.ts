import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

function buildSwaggerDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('register-client')
    .setDescription('The client-register project api')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: '*',
  });
  buildSwaggerDocumentation(app);
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
