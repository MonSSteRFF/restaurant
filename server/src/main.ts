import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { checkProcessEnv } from './utils/checkProcessEnv';
import { swagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  checkProcessEnv();
  swagger(app, 'swagger');

  await app.listen(8080);
}
bootstrap();
