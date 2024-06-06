import {NestFactory} from "@nestjs/core";
import {ConfigService} from "@nestjs/config";

import {AppModule} from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get("api_gateway.port");

  await app.listen(port);
}

bootstrap();
