import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { AppModule } from './presentation/app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');

  //Swagger
  const options = new DocumentBuilder()
    .setTitle('Nestjs Skeleton Api')
    .setDescription('Nestjs Skeleton Application Features')
    .setVersion((process.env.VERSION as string) || '1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  //CORS
  app.enableCors({
    origin: '*',
  });

  //Logger
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  await app.listen(Number(process.env.APP_PORT) || 3000);
}
bootstrap();
