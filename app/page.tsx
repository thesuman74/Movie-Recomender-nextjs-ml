import HeroSection from "@/components/Home/HeroSection";
import MoviesCards from "@/components/ui/cards/MoviesCards";
import SideBar from "@/components/ui/SideBar";
import Image from "next/image";
import Movies from "./Home/Movies";
import MoodCategories from "@/components/ui/cards/MoodCategories";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MoodCategories />
      <Movies />
    </div>
  );
}
