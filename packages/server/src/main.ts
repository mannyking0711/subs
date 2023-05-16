import { NestFactory } from '@nestjs/core';

import { APIModule } from './modules/api.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule, {cors: true});
  const configService = app.get(ConfigService);
  app.enableCors();
  await app.listen(configService.port);
}

bootstrap();
