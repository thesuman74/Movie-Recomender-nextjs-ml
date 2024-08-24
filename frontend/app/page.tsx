import HeroSection from "@/components/Home/HeroSection";

import Movies from "./Home/Movies";
import MoodCategories from "@/components/Home/MoodCategories";
import TabSection from "@/components/Home/TabSection";
import MoviesPage from "./Home/Movies";
import AllMovies from "./movies/page";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TabSection />
      <AllMovies />
    </div>
  );
}
