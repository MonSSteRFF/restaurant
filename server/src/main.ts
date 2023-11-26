import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const checkProcessEnv = () => {
  const config = [
    process.env.JWT_SECRET_ACCESS_CODE,
    process.env.JWT_SECRET_REFRESH_CODE,
    process.env.CREATE_ADMIN_SECRET_KEY,
    process.env.DATABASE_URL,
  ];

  config.forEach((variable) => {
    if (variable === null || variable === undefined || variable === '') {
      throw new Error(`variable ${variable} has null or undefined or ''`);
    }
  });
};

async function bootstrap() {
  checkProcessEnv();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  const config = new DocumentBuilder()
    .setTitle('Restaurant api')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8080);
}
bootstrap();
