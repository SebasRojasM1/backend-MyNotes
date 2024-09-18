/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
  .setTitle('Notes application | API')
  .setDescription(
    'Is an API designed to manage notes to the user',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  console.log('Project started => localhost:3000');
  console.log('=========================================================');
  console.log('Access to the project via Swagger: localhost:3000/api-doc');

  await app.listen(3000);
}
bootstrap();
