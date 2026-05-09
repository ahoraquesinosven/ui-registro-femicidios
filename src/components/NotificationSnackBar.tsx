import {useState} from "react"
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

type Notification = {
  message?: string,
  severity?: AlertColor,
};

export function useNotifications() {
  const [current, setCurrentNotification] = useState<Notification>({});

  return {
    show: (notification: Notification) => {
      setCurrentNotification(notification);
    },

    close: () => {
      setCurrentNotification({});
    },

    current: current,
  };
}

export type NotificationSnackBarProps = {
  currentNotification: Notification,
  closeNotification: () => void,
};

export default function NotificationSnackBar({currentNotification, closeNotification}: NotificationSnackBarProps) {
  return (
    <Snackbar open={!!currentNotification.message} onClose={closeNotification} autoHideDuration={5000}>
      <Alert
        severity={currentNotification.severity}
        variant="filled"
        onClose={closeNotification}>
        {currentNotification.message}
      </Alert>
    </Snackbar>
  );
}
