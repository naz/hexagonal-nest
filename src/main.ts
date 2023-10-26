import { NestFactory } from '@nestjs/core';
import { generateOpenApi } from '@ts-rest/open-api';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { contract as userAPIContract } from './http/controllers/user.contract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = generateOpenApi(
    userAPIContract,
    {
      info: {
        title: 'Users API',
        version: '1.0.0',
      },
    },
    {
      setOperationId: true,
    },
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
