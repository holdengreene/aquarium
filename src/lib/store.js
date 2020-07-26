import { writable } from "svelte/store";

function createPopup() {
  const { subscribe, set } = writable(false);

  return {
    subscribe,
    open: () => set(true),
    close: () => set(false),
  };
}

export const popup = createPopup();
