import { faCompass, faGear, faLayerGroup, faBagShopping, faMessage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import DeckCreatorButton from "../DeckCreatorButton";
import { Suspense } from "react";
import { isMobile } from "@/utils/DeviceUtils";
import SidebarOption from "./SidebarOption";

export default function Sidebar({ className }: { className: string }) {

  return (
    <aside className={`sidebar-container shadow-md p-4 bg-white gap-2 ${className}`}>
      <Link className="btn btn-ghost flex items-center justify-center gap-2 text-xl p-0" href="/deck">
        <Image src="https://res.cloudinary.com/dd2ntmm1w/image/upload/v1731002279/logo_s5wgbq.png" alt="amaizely_logo" width={30} height={30} />
        <p>am<span>(AI)</span>zely</p>
      </Link>

      {
        !isMobile() && (
          <Suspense fallback={<div className="skeleton h-12 w-full"></div>}>
            <DeckCreatorButton />
          </Suspense>
        )
      }

      <div className="flex flex-col gap-2 mt-4">
        <Link href="/deck">
          <SidebarOption icon={faLayerGroup} text="My Decks" path="/deck" />
        </Link>
        <Link href="/revise">
          <SidebarOption icon={faCompass} text="Revise" path="/revise" />
        </Link>
        <Link href="/settings">
          <SidebarOption icon={faGear} text="Settings" path="/settings" />
        </Link>
        <Link href="/purchase">
          <SidebarOption icon={faBagShopping} text="Purchase" path="/purchase" />
        </Link>
        <a href="https://737x5ktq3ep.typeform.com/to/OyhGWmWM" target="_blank">
          <SidebarOption icon={faMessage} text="Feedback" path="/feedback" />
        </a>
      </div>
    </aside>
  )
}