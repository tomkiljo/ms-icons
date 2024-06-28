export const EventType = {
  SnackbarMessage: "snackbar:message",
} as const;
export type EventType = (typeof EventType)[keyof typeof EventType];

export function subscribe(
  eventName: string,
  listener: EventListenerOrEventListenerObject
) {
  document.addEventListener(eventName, listener);
}

export function unsubscribe(
  eventName: string,
  listener: EventListenerOrEventListenerObject
) {
  document.removeEventListener(eventName, listener);
}

export function dispatch(eventName: string, data: unknown) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}
