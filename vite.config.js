import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
        }),
        svelte(),
    ],
});
