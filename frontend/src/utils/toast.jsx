
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X } from 'lucide-react';

const toastConfig = {
  position: 'top-center',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  transition: Slide,
  className: 'rounded-md font-medium shadow-md text-sm',
  closeButton: ({ closeToast }) => (
    <button
      onClick={closeToast}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white absolute top-4 right-4"
    >
      <X size={18} />
    </button>
  ),
};

// 🟢 Success Toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    ...toastConfig,
    className:
      'bg-white text-[#1A3C66] dark:bg-[#2B7DBD] dark:text-white border-l-4 border-green-500',
  });
};

// 🔴 Error Toast
export const showErrorToast = (message) => {
  toast.error(message, {
    ...toastConfig,
    className:
      'bg-white text-[#1A3C66] dark:bg-[#2B7DBD] dark:text-white border-l-4 border-red-500',
  });
};

// 🔵 Info Toast
export const showInfoToast = (message) => {
  toast.info(message, {
    ...toastConfig,
    className:
      'bg-white text-[#1A3C66] dark:bg-[#2B7DBD] dark:text-white border-l-4 border-blue-500',
  });
};

// 🟡 Warning Toast
export const showWarningToast = (message) => {
  toast.warning(message, {
    ...toastConfig,
    className:
      'bg-white text-[#1A3C66] dark:bg-[#2B7DBD] dark:text-white border-l-4 border-yellow-400',
  });
};
