import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './guards/JwtAuthGuard';
import { AppModule } from './modules/Application';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication');
  const reflector = app.get(Reflector);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  logger.log(`Server started on the ${AppModule.port} port.`);
  await app.listen(AppModule.port || 3000);
}
bootstrap();
