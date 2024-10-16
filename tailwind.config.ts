import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blue50:'#00A3FF',
        blue100:'#00D1FF',
        gray50:'#565656',
        gray100:'#242424',
        gray200:'#929292',
        gray300:'#181818',
      },
    },
  },
  plugins: [],
};
export default config;
