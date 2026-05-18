import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { NotificationState } from "@/hooks/notifications"

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
