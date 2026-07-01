import { useEffect } from "react";

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `Femicidios - ${title}`;
  }, [title]);
}

export default useDocumentTitle;


