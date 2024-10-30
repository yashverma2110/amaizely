'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleExclamation, faCircleInfo, faCircleCheck } from "@fortawesome/free-solid-svg-icons";


interface IAlert {
  message: string;
  type: "error" | "warning" | "info" | "success";
}
export default function AlertsManager({ alerts }: { alerts: IAlert[] }) {

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
    <div className="flex flex-col gap-2">
      {alerts.map((alert) => (
        <div role="alert" className={`alert alert-${alert.type}`}>
          <FontAwesomeIcon icon={getIconForAlertType(alert.type)} />
          <span>{alert.message}</span>
        </div>
      ))}
    </div>
  )
}