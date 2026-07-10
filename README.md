# bbom-auth-forgot_password-module

Modulo BBOM para orquestar el flujo de forgot password.

## Scripts

- `npm run build`: compila TypeScript hacia `dist/`
- `npm run typecheck`: valida tipos sin emitir artefactos
- `npm run localhost`: levanta mock local en puerto 3000
- `npm run test`: ejecuta pruebas unitarias

## Docker

- `docker compose up bbom-auth-forgot-password-module-localhost`: levanta el endpoint local en `http://localhost:3001`
- `docker compose --profile test run --rm bbom-auth-forgot-password-tests`: ejecuta pruebas aisladas en contenedor

## Endpoint local

`POST /auth/forgot-password`

Body:

```json
{
	"username": "username o email o phone"
}
```

Success (siempre para casos de negocio no visibles y happy path):

```json
{
	"message": "Si el usuario existe, recibiras una notificacion de recuperacion"
}
```