
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            environment: "dev" | "prod";
        }
    }
}

export {};