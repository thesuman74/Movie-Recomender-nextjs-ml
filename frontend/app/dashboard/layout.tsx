import SideBar from "@/components/ui/SideBar";
import { ReactNode } from "react";

export default function FilterLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full mx-auto h-full flex  overflow-hidden bg-black ">
      {/* Sidebar section visible on larger screens */}
      <div className="flex w-1/6 sticky  top-0 mr-20  h-screen ">
        <SideBar />
      </div>

      {/* Main content section, properly aligned and spaced */}

      <div className="container w-5/6 h-full">{children}</div>
    </main>
  );
}
