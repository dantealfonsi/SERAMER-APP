import {toast} from "react-toastify";
import type {ToastOptions} from "react-toastify";

type ToastType= "success"|"error";

interface ShowToastProps{
  title: string;
  message: string;
  type: ToastType;
  options?: ToastOptions;
}

const icons = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="#4CAF50"
    >
      <path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#F44336"
    >
      <path d="M359-95q-19 0-37-7.5T291-123L123-291q-13-13-20.5-31T95-359v-242q0-19 7.5-37t20.5-31l168-168q13-13 31-21t37-8h242q19 0 37 8t31 21l168 168q13 13 21 31t8 37v242q0 19-8 37t-21 31L669-123q-13 13-31 20.5T601-95H359Zm121-335 95 95q10 11 24 10.5t26-11.5q11-11 11-25t-11-25l-95-94 95-95q11-10 11-24t-11-26q-12-11-25.5-11T575-625l-95 95-94-95q-11-11-25-11t-25 11q-11 12-11 25.5t11 24.5l94 95-95 94q-11 11-10.5 25t11.5 25q11 11 25 11t25-11l94-94Z" />
    </svg>
  ),
};

export default function showToast({ title, message, type, options = {}}: ShowToastProps): void {
  toast(
    <div className="d-flex align-items-start gap-3">
      <div className="flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
        {icons[type]}
      </div>
      <div className="flex-grow-1">
        <h6 className="fw-bold mb-1">{title}</h6>
        <p className="mb-0 small text-muted">{message}</p>
      </div>
    </div>,
    {
      type,
      ...options, 
      icon: false,
    }
  );
}
