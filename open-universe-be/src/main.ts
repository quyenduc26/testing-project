import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import morgan from 'morgan';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.use(
    morgan(
      ':method :url :status :response-time ms :res[content-length] ":referrer" :remote-user [:date[web]]',
    ),
  );
  app.use(helmet());

  app.enableCors({
    origin: process.env.FE_URL, // Địa chỉ gốc của frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Cho phép gửi cookie qua CORS
  });

  const config = new DocumentBuilder()
    .setTitle('OpenU API')
    .setDescription('The OpenU API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log('App run on: http://localhost:3000');
}
bootstrap();
