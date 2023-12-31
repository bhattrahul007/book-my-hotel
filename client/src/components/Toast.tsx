import { useEffect, useRef } from "react";
import { ToastParam } from "./../context/AppContext";

export const Toast = ({
  children,
  type,
  onClose,
}: ToastParam & { onClose: () => void }) => {
  const timerRef = useRef<number>(undefined as any);

  useEffect(() => {
    if (timerRef.current === undefined) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, 5000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined as any;
      }
    };
  }, []);

  const styles = {
    success:
      "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md",
    error:
      "fixed top-4 right-4 p-4 z-50 rounded-md bg-red-600 text-white max-w-md",
  }[type];

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{children}</span>
      </div>
    </div>
  );
};
