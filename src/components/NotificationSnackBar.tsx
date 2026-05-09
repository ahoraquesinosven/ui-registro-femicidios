import {useState} from "react"
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

type Notification = {
  message?: string,
  severity?: AlertColor,
};

type NotificationState = {
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

export type NotificationSnackBarProps = {
  currentNotification: NotificationState,
  closeNotification: () => void,
};

export default function NotificationSnackBar({currentNotification, closeNotification}: NotificationSnackBarProps) {
  return (
    <Snackbar open={currentNotification.isOpen} onClose={closeNotification} autoHideDuration={5000}>
      <Alert
        severity={currentNotification.notification?.severity}
        variant="filled"
        onClose={closeNotification}>
        {currentNotification.notification?.message}
      </Alert>
    </Snackbar>
  );
}
