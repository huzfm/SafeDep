import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["MonaSans", "ui-sans-serif", "system-ui"],
        mona: ["MonaSans", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
