import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function buildSwaggerDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nest With Tests Api')
    .setDescription('The Nest With Tests Api project')
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
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
