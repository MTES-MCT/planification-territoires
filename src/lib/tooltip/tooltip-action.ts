import type { ComponentType } from "svelte";
import Tooltip from "./tooltip-component.svelte";

export function tooltipAction(
  element: Node,
  { data, innerComponent }: { data: object; innerComponent: ComponentType }
) {
  let tooltipComponent: Tooltip;

  function enter(event: Event) {
    const ptrEvt = event as PointerEvent;
    tooltipComponent = new Tooltip({
      props: {
        innerComponent,
        data,
        x: ptrEvt.pageX,
        y: ptrEvt.pageY,
      },
      target: document.body,
    });
  }

  function move(event: Event) {
    const ptrEvt = event as PointerEvent;
    tooltipComponent.$set({
      x: ptrEvt.pageX,
      y: ptrEvt.pageY,
    });
  }

  function leave() {
    tooltipComponent.$destroy();
  }

  element.addEventListener("pointerenter", enter);
  element.addEventListener("pointerleave", leave);
  element.addEventListener("pointermove", move);

  return {
    destroy() {
      if (tooltipComponent) {
        tooltipComponent.$destroy();
      }
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointermove", move);
    },
  };
}
