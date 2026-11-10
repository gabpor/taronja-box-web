/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // ─── Direct Hex Tokens ───
                primary: '#131D2D',
                'primary-dark': '#0A111A',
                accent: '#D96A3E',
                'accent-hover': '#B8552F',
                secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
                surface: {
                    DEFAULT: 'hsl(var(--color-surface) / <alpha-value>)',
                    raised: 'hsl(var(--color-surface-raised) / <alpha-value>)',
                },
                border: 'hsl(var(--color-border) / <alpha-value>)',
            },
            fontFamily: {
                display: ['"Bebas Neue"', 'sans-serif'],
                body: ['"Open Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
