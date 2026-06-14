"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button'], [tabindex]:not([tabindex='-1'])";

const Cursor: React.FC = () => {
  const tipRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tip = tipRef.current;
    const halo = haloRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!tip || !halo || !finePointer.matches) {
      return;
    }

    let animationFrame = 0;
    let targetX = -100;
    let targetY = -100;
    let haloX = -100;
    let haloY = -100;

    const animateHalo = () => {
      haloX += (targetX - haloX) * 0.24;
      haloY += (targetY - haloY) * 0.24;
      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate3d(-50%, -50%, 0)`;

      if (
        Math.abs(targetX - haloX) > 0.05 ||
        Math.abs(targetY - haloY) > 0.05
      ) {
        animationFrame = window.requestAnimationFrame(animateHalo);
      } else {
        haloX = targetX;
        haloY = targetY;
        animationFrame = 0;
      }
    };

    const startHaloAnimation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateHalo);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const points = event.getCoalescedEvents?.() ?? [event];
      const point = points[points.length - 1];

      targetX = point.clientX;
      targetY = point.clientY;
      tip.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      const interactive =
        event.target instanceof Element &&
        event.target.closest(INTERACTIVE_SELECTOR) !== null;

      tip.classList.toggle("is-interactive", interactive);
      halo.classList.toggle("is-interactive", interactive);
      tip.classList.add("is-visible");
      halo.classList.add("is-visible");
      startHaloAnimation();
    };

    const hideCursor = () => {
      tip.classList.remove("is-visible", "is-pressed");
      halo.classList.remove("is-visible", "is-pressed");
    };

    const handlePointerDown = () => {
      tip.classList.add("is-pressed");
      halo.classList.add("is-pressed");
    };

    const handlePointerUp = () => {
      tip.classList.remove("is-pressed");
      halo.classList.remove("is-pressed");
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="cursor-halo" ref={haloRef} />
      <div aria-hidden="true" className="cursor-tip" ref={tipRef}>
        <span />
      </div>
    </>
  );
};

export default Cursor;
