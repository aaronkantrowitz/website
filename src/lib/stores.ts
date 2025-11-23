import { writable } from 'svelte/store';

// Active slide index. -1 is Hero (00), 0 is "My Work" (skipped in nav), 1 is first project (01), etc.
export const activeSection = writable<number>(-1);

export const mobileNavOpen = writable<boolean>(false);

export const isNavigating = writable<boolean>(false);

export const windowHeight = writable<number>(1080);
