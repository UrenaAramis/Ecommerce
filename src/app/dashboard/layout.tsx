import type { ReactNode } from "react"
import DashboardNavigation from "@/components/DashboardNavigation"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div >
      <header >
        <div >
          <DashboardNavigation />
        </div>
      </header>
      <main >{children}</main>
    </div>
  )
}

