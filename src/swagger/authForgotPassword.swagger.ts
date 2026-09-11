export const AuthForgotPasswordSwagger = {
    tags: ["auth"],
    summary: "Inicia el flujo de recuperacion de contrasena",
    description:
        "Recibe un username y, si el perfil existe y esta activo, dispara la generacion de un token de recuperacion de credenciales. Siempre responde con un mensaje generico para no revelar si el usuario existe.",
    body: {
        type: "object",
        properties: {
            username: { type: "string" }
        },
        required: ["username"]
    },
    response: {
        200: {
            description: "Solicitud procesada, mensaje generico de exito",
            type: "object",
            properties: {
                message: { type: "string" }
            }
        },
        400: {
            description: "Bad Request - Campos requeridos faltantes",
            type: "object",
            properties: {
                statusCode: { type: "number" },
                statusType: { type: "string" },
                details: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                        missingFields: { type: "array", items: { type: "string" } }
                    }
                }
            }
        },
        401: {
            description: "Unauthorized",
            type: "object",
            properties: {
                statusCode: { type: "number" },
                statusType: { type: "string" },
                details: { type: "object", properties: { message: { type: "string" } } }
            }
        },
        404: {
            description: "Not Found",
            type: "object",
            properties: {
                statusCode: { type: "number" },
                statusType: { type: "string" },
                details: { type: "object", properties: { message: { type: "string" } } }
            }
        },
        500: {
            description: "Internal Server Error",
            type: "object",
            properties: {
                statusCode: { type: "number" },
                statusType: { type: "string" },
                details: { type: "object", properties: { message: { type: "string" } } }
            }
        }
    }
};
