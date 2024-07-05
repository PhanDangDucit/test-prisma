import type { Config } from "tailwindcss";
const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/**/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/node_modules/flowbite/**/*.js",
        "./src/configs/editor.config.tsx",
    ],
    theme: {
        extend: {
        backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        },
    },
    plugins: [
        require("daisyui"),
        require('flowbite/plugin')
    ],
};
export default config;