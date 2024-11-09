'use client';
import { useEffect, useState } from "react";
import Alert from "./ui/Alert";

export interface IAlert {
  message: string;
  type: "error" | "warning" | "info" | "success";
  duration?: number;
}
export default function AlertsManager({ alerts }: { alerts: IAlert[] }) {
  const [allAlerts, setAllAlerts] = useState<IAlert[]>([]);

  useEffect(() => {
    setAllAlerts(alerts);
  }, [alerts])

  function onClose(index: number) {
    setAllAlerts(allAlerts.filter((_, i) => i !== index));
  }

  return (
    <div className="fixed bottom-16 right-0 md:bottom-4 flex flex-col p-4 gap-2">
      {allAlerts.map((alert, index) => (
        <Alert key={alert.message} {...alert} onClose={() => onClose(index)} />
      ))}
    </div>
  )
}