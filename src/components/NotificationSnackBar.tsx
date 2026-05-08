import {useState} from "react"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function useNotifications() {
  const [current, setCurrentNotification] = useState("");

  return {
    show: (message: string) => {
      setCurrentNotification(message);
    },

    close: () => {
      setCurrentNotification("");
    },

    current: current,
  };
}

export type NotificationSnackBarProps = {
  currentNotification: string,
  closeNotification: () => void,
};

export default function NotificationSnackBar({currentNotification, closeNotification}: NotificationSnackBarProps) {
  return (
    <Snackbar open={!!currentNotification} onClose={closeNotification} autoHideDuration={5000}>
      <Alert
        severity="success"
        variant="filled"
        onClose={closeNotification}>
        {currentNotification}
      </Alert>
    </Snackbar>
  );
}
