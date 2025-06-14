import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "sqlite",
    schema: "./src/**/*.entity.ts",
    out: "./src/migrations",
});