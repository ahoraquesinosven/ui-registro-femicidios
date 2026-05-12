import {useState} from "react"
import { AlertColor } from "@mui/material/Alert";

export type Notification = {
  message?: string,
  severity?: AlertColor,
};

export type NotificationState = {
  notification?: Notification,
  isOpen: boolean,
}

export function useNotifications() {
  const [current, setCurrentNotification] = useState<NotificationState>({
    isOpen: false,
  });

  return {
    show: (notification: Notification) => {
      setCurrentNotification({
        notification,
        isOpen: true,
      });
    },

    close: () => {
      setCurrentNotification((value) => ({
        notification: value.notification,
        isOpen: false,
      }));
    },

    current: current,
  };
}

