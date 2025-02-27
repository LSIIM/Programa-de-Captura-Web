import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        retries: 10,
        baseUrl: "http://localhost:3000",
        experimentalRunAllSpecs: true,
        setupNodeEvents(on, config) {
            require("@cypress/code-coverage/task")(on, config);
            return config;
        },
    },
});
