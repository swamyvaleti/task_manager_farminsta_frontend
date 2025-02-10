"use client";

import * as React from "react";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
  ToastClose,
} from "@/components/ui/toast";

const ToastContext = React.createContext<any>(null);

export const useToast = () => {
  return React.useContext(ToastContext);
};

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = React.useState<any[]>([]);

  const addToast = (toast: {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => {
    const id = Date.now();
    setToasts([...toasts, { id, ...toast }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      <ToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast key={toast.id} variant={toast.variant}>
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description && (
              <ToastDescription>{toast.description}</ToastDescription>
            )}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
};
