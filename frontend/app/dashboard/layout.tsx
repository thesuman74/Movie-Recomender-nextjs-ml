import SideBar from "@/components/ui/SideBar";
import { ReactNode } from "react";

export default function FilterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex gap-5 ">
        <aside className="h-screen w-80  sticky top-0 hidden lg:block">
          <SideBar />
        </aside>
        <main className="w-full flex-col  space-y-4 mx-6 ">
          <section className=" rounded-lg  flex items-center justify-center">
            {children}
          </section>
        </main>
      </div>
    </>
  );
}
