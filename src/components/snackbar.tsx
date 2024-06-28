"use client";

import { EventType, subscribe, unsubscribe } from "@/lib/events";
import { useEffect, useState } from "react";

export default function Snackbar() {
  const [message, setMessage] = useState<string | null>(null);

  const handleEvent: EventListener = (event: Event) => {
    const messageEvent = event as CustomEvent<string>;
    setMessage(messageEvent.detail);
  };

  useEffect(() => {
    subscribe(EventType.SnackbarMessage, handleEvent);
    return () => {
      unsubscribe(EventType.SnackbarMessage, handleEvent);
    };
  }, []);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message]);

  return (
    <div
      data-show={!!message}
      className="invisible min-w-64 -ml-32 bg-blue-500 text-white text-center text-md p-4 rounded-md shadow-lg shadow-black fixed z-10 left-[50%] bottom-8 data-[show=true]:visible data-[show=true]:animate-snackbar"
    >
      {message}
    </div>
  );
}
