import { toast } from "react-toastify";

export const successToast = (payload: string, id: string) => {
  return toast.success(payload, {
    toastId: id,
    autoClose: 4000,
    pauseOnFocusLoss: false,
  });
};

export const errorToast = (payload: string, id: string) => {
  return toast.error(payload, {
    toastId: id,
    autoClose: 4000,
    pauseOnFocusLoss: false,
  });
};
