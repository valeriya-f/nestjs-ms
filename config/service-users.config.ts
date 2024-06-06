import { Transport, ClientProvider } from "@nestjs/microservices";

export default (): { service_users: ClientProvider } => ({
  service_users: {
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env.SERVICE_USERS_PORT, 10)
    }
  },
});