"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    database: {
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    },
    port: parseInt(process.env.PORT, 10) || 3333,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
});
exports.configuration = configuration;
//# sourceMappingURL=configuration.js.map