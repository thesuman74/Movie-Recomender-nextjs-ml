import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import MoodCategories from "../ui/cards/MoodCategories";
import GenreCategories from "../ui/cards/GenresCard";

const TabSection = () => {
  return (
    // The outer container ensures everything is centered on the page
    <div className="flex flex-col items-center justify-center w-full  ">
      <div className=" mx-auto p-4 mt-2 ">
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
          Discover top-rated movies based on your Mood and Genre
        </h1>
        <h2 className="text-center text-md sm:text-lg md:text-xl lg:text-2xl mb-8">
          How do You want to Continue?
        </h2>
        <Tabs defaultValue="Mood" className="w-full dark">
          <TabsList className="flex justify-center">
            {/* The TabsList itself should also be flex to justify the content center */}
            <TabsTrigger
              className="text-2xl font-bold mx-10 px-10 "
              value="Mood"
            >
              Mood Mania
            </TabsTrigger>
            <TabsTrigger
              className="text-2xl font-bold mx-10 px-10"
              value="Genre"
            >
              Genre
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Mood">
            <MoodCategories />
          </TabsContent>
          <TabsContent value="Genre">
            <GenreCategories />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TabSection;
