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
                    "14%": { transform: "scale(1.3)" },
                    "28%": { transform: "scale(1)" },
                    "42%": { transform: "scale(1.25)" },
                    "70%": { transform: "scale(1)" },
                },
            },
            animation: {
                heartbeat: "heartbeat 2s ease-in-out infinite",
            },
        },
    },

    plugins: [require("@tailwindcss/typography"), forms],
};
