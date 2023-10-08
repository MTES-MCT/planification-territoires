export default function clickAnywhere(node: Node) {
  const handlePointerDown = (event: Event) => {
    const target = event.target as Node;
    if (!node.contains(target)) {
      node.dispatchEvent(new CustomEvent("clickoutside"));
    } else {
      node.dispatchEvent(new CustomEvent("clickinside"));
    }
  };

  document.addEventListener("pointerdown", handlePointerDown, true);

  return {
    destroy() {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    },
  };
}
