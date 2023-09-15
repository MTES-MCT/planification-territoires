/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        // https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-de-l-identite-de-l-etat/couleurs-palette
        "text-title-blue-france": "#000091",
      },
      fontFamily: {
        sans: ["Marianne"],
      },
    },
  },
  plugins: [],
};
