import Fastify from "fastify";
import {
  authForgotPassword,
  AuthForgotPasswordError,
  AuthForgotPasswordErrorInternal,
  AuthForgotPasswordSwagger,
  type AuthForgotPasswordContract,
} from "../src/index.js";
import {
  mockGetBcpmStatusesOneOKPort,
  mockGetBurmUserProfileIdentifiersUniqueOKPort,
  mockPostBurmCredentialTemporaryTokensOKPort,
} from "./mocks/authForgotPassword.mocks.js";

const server = Fastify({ logger: true });

server.post("/auth/forgot-password", { schema: AuthForgotPasswordSwagger }, async (request, reply) => {
  try {
    const body = request.body as { username: string };
    const requestLogger = request.log.child({
      route: "Auth",
      functionality: "forgot-password",
      module: "bbom-auth-forgot-password-module",
    });

    const mockContract: AuthForgotPasswordContract = {
      req: {
        username: body.username,
      },
      ports: {
        getBurmUserProfileIdentifierPort: mockGetBurmUserProfileIdentifiersUniqueOKPort,
        getBcpmStatusesOnePort: mockGetBcpmStatusesOneOKPort,
        createBurmCredentialTemporaryTokenPort: mockPostBurmCredentialTemporaryTokensOKPort,
      },
      logger: requestLogger,
    };

    const result = await authForgotPassword(mockContract);
    reply.status(200).send(result);
  } catch (error) {
    const mapped = error instanceof AuthForgotPasswordError ? error : AuthForgotPasswordErrorInternal;
    reply.status(mapped.statusCode).send(mapped);
  }
});

const start = async (): Promise<void> => {
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("\nServidor de pruebas local escuchando en http://localhost:3000");
    console.log("Puedes enviar un POST a http://localhost:3000/auth/forgot-password\n");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
