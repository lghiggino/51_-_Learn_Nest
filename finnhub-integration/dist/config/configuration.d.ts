export declare const configuration: () => {
    NODE_ENV: string;
    database: {
        user: string;
        password: string;
    };
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    };
};
