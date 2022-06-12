import { useEffect, RefObject } from "react";

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current?.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
