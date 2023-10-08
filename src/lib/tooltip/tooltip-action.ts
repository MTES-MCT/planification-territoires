import type { ComponentType } from "svelte";
import TooltipComponent from "./tooltip-component.svelte";

let tooltipComponent: TooltipComponent | null = null;

export function tooltipAction(
  element: Node,
  { data, innerComponent }: { data: object; innerComponent: ComponentType }
) {
  function showPopup(x: number, y: number) {
    hidePopup();
    tooltipComponent = new TooltipComponent({
      props: {
        innerComponent,
        data,
        x,
        y,
        onClickAnywhere: handleClickAnywhere,
      },
      target: document.body,
    });
  }

  function hidePopup() {
    if (tooltipComponent) {
      tooltipComponent.$destroy();
      tooltipComponent = null;
    }
  }

  function handleClickAnywhere() {
    hidePopup();
  }

  function pointerMove(event: Event) {
    const ptrEvent = event as PointerEvent;
    if (ptrEvent.pointerType === "mouse" && tooltipComponent) {
      tooltipComponent.$set({
        x: ptrEvent.pageX,
        y: ptrEvent.pageY,
      });
    }
  }

  function pointerEnter(event: Event) {
    const ptrEvent = event as PointerEvent;
    if (ptrEvent.pointerType === "mouse") {
      showPopup(ptrEvent.pageX, ptrEvent.pageY);
    }
  }

  function pointerLeave(event: Event) {
    const ptrEvent = event as PointerEvent;
    if (ptrEvent.pointerType === "mouse") {
      hidePopup();
    }
  }

  function pointerDown(event: Event) {
    const ptrEvent = event as PointerEvent;
    if (ptrEvent.pointerType === "touch") {
      showPopup(ptrEvent.pageX, ptrEvent.pageY);
    }
  }

  element.addEventListener("pointerenter", pointerEnter);
  element.addEventListener("pointerleave", pointerLeave);
  element.addEventListener("pointermove", pointerMove);
  element.addEventListener("pointerdown", pointerDown);

  return {
    destroy() {
      if (tooltipComponent) {
        tooltipComponent.$destroy();
      }
      element.removeEventListener("pointerenter", pointerEnter);
      element.removeEventListener("pointerleave", pointerLeave);
      element.removeEventListener("pointermove", pointerMove);
      element.removeEventListener("pointerdown", pointerDown);
    },
  };
}
