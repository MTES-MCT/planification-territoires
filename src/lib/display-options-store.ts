import { writable } from "svelte/store";

const displayOptions = writable({
  selectedViz: "mondrian",
  showRemainingOnly: false,
});
export default displayOptions;
