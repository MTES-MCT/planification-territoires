import { writable } from "svelte/store";

const displayOptions = writable({
  selectedViz: "secteurs",
  showRemainingOnly: false,
});
export default displayOptions;
