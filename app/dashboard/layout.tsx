import SideBar from "@/components/ui/SideBar";
import { ReactNode } from "react";

export default function FilterLayout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-screen-2xl mx-auto h-full flex  overflow-hidden">
      {/* Sidebar section visible on larger screens */}
      <div className="hidden lg:flex w-[18%]  sticky top-0 h-screen">
        <SideBar />
      </div>

      {/* Main content section, properly aligned and spaced */}
      <div className="flex-auto lg:ml-5">
        <div className="container  h-full">{children}</div>
      </div>
    </main>
  );
}
