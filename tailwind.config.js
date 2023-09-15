/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        // https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-de-l-identite-de-l-etat/couleurs-palette
        "title-blue-france": "#000091",
        "marianne-red": "#e1000f",
      },
      fontFamily: {
        sans: ["Marianne"],
      },
    },
  },
  plugins: [],
};
