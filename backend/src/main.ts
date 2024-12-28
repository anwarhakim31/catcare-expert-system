import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.use(cookieParser());

  const origin = process.env.ORIGIN || 'http://localhost:3000';

  app.enableCors({
    origin: origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  });
  await app.listen(4000);
}
bootstrap();
