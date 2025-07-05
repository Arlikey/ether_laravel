import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                heartbeat: {
                    "0%": { transform: "scale(1)" },
                    "14%": { transform: "scale(1.15)" },
                    "28%": { transform: "scale(1)" },
                    "42%": { transform: "scale(1.1)" },
                    "70%": { transform: "scale(1)" },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
            animation: {
                heartbeat: "heartbeat 2s ease-in-out infinite",
                wiggle: "wiggle 1s ease-in-out infinite",
            },
        },
    },

    plugins: [require("@tailwindcss/typography"), forms],
};
