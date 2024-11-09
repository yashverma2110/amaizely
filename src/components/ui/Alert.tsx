import { faCircleCheck, faCircleExclamation, faCircleInfo, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IAlert } from "../AlertsManager";
import { useEffect } from "react";

interface IAlertProps extends IAlert {
  onClose: () => void;
}
export default function Alert({ message, type, duration, onClose }: IAlertProps) {

  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, duration || 3000);
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

  function getAlertClassForType(type: IAlert["type"]) {
    switch (type) {
      case "info":
        return "alert-info";
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "warning":
        return "alert-warning";
      default:
        return "alert-info";
    }
  }

  return (
    <div role="alert" className={`alert ${getAlertClassForType(type)} w-fit flex text-xs md:text-base text-left items-center text-white font-semibold`}>
      <FontAwesomeIcon icon={getIconForAlertType(type)} />
      <span>{message}</span>
    </div>
  )
}