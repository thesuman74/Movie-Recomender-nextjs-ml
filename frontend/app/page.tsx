import HeroSection from "@/components/Home/HeroSection";

import Movies from "./Home/Movies";
import MoodCategories from "@/components/Home/MoodCategories";
import TabSection from "@/components/Home/TabSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TabSection />
      <Movies />
    </div>
  );
}
