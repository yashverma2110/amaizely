"use client"

import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname } from "next/navigation"

export default function SidebarOption({ icon, text, path }: { icon: IconDefinition, text: string, path: string }) {
  const pathname = usePathname();

  function getNavIconClass(path: string) {
    switch (pathname) {
      case path:
        return "w-full flex gap-2 p-2 items-center rounded-lg text-primary bg-gray-200";
      default:
        return "w-full flex gap-2 p-2 items-center rounded-lg hover:bg-gray-100";
    }
  }

  function getNavTextClass(path: string) {
    switch (pathname) {
      case path:
        return 'text-primary text-md';
      default:
        return 'text-md';
    }
  }

  return (
    <div className={getNavIconClass(path)}>
      <FontAwesomeIcon icon={icon} className="h-5 w-5" />
      <span className={getNavTextClass(path)}>{text}</span>
    </div>
  )
}