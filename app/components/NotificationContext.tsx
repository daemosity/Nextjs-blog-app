"use client";

import { createContext, useContext, useState } from "react";

type NotificationType = "success" | "error";

export type ActionStatus = {
  error: string;
  success?: boolean;
  testFlag?: string;
};

type NotificationContextType = {
  message: string;
  type: NotificationType;
  testFlag: string;
  showNotification: (
    message: string,
    type?: NotificationType,
    testFlag?: string,
  ) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  testFlag: "",
  showNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");
  const [testFlag, setTestFlag] = useState<string>("");

  const showNotification = (
    msg: string,
    notifType: NotificationType = "success",
    testFlag: string = "",
  ) => {
    setMessage(msg);
    setType(notifType);
    setTestFlag(testFlag);
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <NotificationContext value={{ message, type, testFlag, showNotification }}>
      {children}
    </NotificationContext>
  );
};

export const useNotification = () => useContext(NotificationContext);
