import { faCircleCheck, faCircleExclamation, faCircleInfo, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IAlert } from "../AlertsManager";
import { useEffect } from "react";

interface IAlertProps extends IAlert {
  onClose: () => void;
}
export default function Alert({ message, type, duration, onClose }: IAlertProps) {

  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        onClose();
      }, duration);
    }
  }, [duration])

  function getIconForAlertType(type: IAlert["type"]) {
    switch (type) {
      case "info":
        return faCircleInfo;
      case "success":
        return faCircleCheck;
      case "error":
        return faCircleXmark;
      case "warning":
        return faCircleExclamation;
      default:
        return faCircleInfo;
    }
  }

  return (
    <div role="alert" className={`alert alert-${type} flex text-xs md:text-base text-left items-center text-white font-semibold`}>
      <FontAwesomeIcon icon={getIconForAlertType(type)} />
      <span>{message}</span>
    </div>
  )
}