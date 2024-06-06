import {NestFactory} from "@nestjs/core";
import {Transport, MicroserviceOptions} from "@nestjs/microservices";

import {ServiceUsersModule} from "./service-users.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServiceUsersModule,
    {
      transport: Transport.TCP,
      options: {
        port: parseInt(process.env.SERVICE_USERS_PORT, 10)
      }
    },
  );

  await app.listen();
}

bootstrap();
