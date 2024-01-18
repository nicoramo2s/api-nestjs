import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Nestjs API')
    .setDescription(
      'This API is the final project of the Bootcamp "JavaScript en el Backend" by Codigo Facilito',
    )
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running in port ${process.env.PORT}`);
  });
}
bootstrap();
