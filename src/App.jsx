import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CatCard from "./components/CatCard";
import { assets } from "./assets/assets";

const App = () => {
  const TOTAL_CATS = 10;

  const [catImages, setCatImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  // Preload images first
  useEffect(() => {
    const loadCats = async () => {
      const urls = Array.from({ length: TOTAL_CATS }).map(
        (_, i) => `https://cataas.com/cat?random=${Date.now()}-${i}`
      );

      const loadedImages = [];

      // Preload cat images 1 by 1
      for (let url of urls) {
        await new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = resolve;
        });
        loadedImages.push(url);
      }

      setCatImages(loadedImages);
      setLoading(false);
    };

    loadCats();
  }, []);

  const handleSwipe = (dir) => {
    if (dir === "right") {
      setLiked((prev) => [...prev, catImages[current]]);
    }
    setCurrent((prev) => prev + 1);
  };

  // 🐾 Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EFE6]">
        <p className="font-baloo text-3xl text-primary animate-pulse">
          Loading cute cats… 🐱💕
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EFE6]">
      <Header />

      <div className="flex flex-col items-center justify-center mt-2 px-4 py-10">
        {current < catImages.length ? (
          <>
            {/* Title */}
            <div className="flex flex-col items-center mt-12 animate-fadeIn">
              <div className="flex items-center justify-center gap-3">
                <img src={assets.deco} className="w-14 h-14 opacity-80" />

                <p className="font-baloo text-primary text-center text-3xl font-bold tracking-wide drop-shadow-sm">
                  Please swipe or choose a button
                </p>

                <img src={assets.deco} className="w-14 h-14 opacity-80" />
              </div>

              <p className="font-baloo text-gray-600 text-sm mt-3 opacity-80">
                (kitties are waiting…)
              </p>

              {/* Progress Counter */}
              <p className="font-baloo text-primary text-lg mt-4">
                {TOTAL_CATS - current} / {TOTAL_CATS} left
              </p>
            </div>

            {/* Cat Card */}
            <CatCard img={catImages[current]} onSwipe={handleSwipe} />

            {/* Buttons */}
            <div className="flex gap-10 mt-10 items-center animate-fadeIn">
              <img
                src={assets.dislike}
                className="w-20 cursor-pointer hover:scale-110 transition-transform drop-shadow-md"
                onClick={() => handleSwipe("left")}
              />

              <img
                src={assets.love}
                className="w-20 cursor-pointer hover:scale-110 transition-transform drop-shadow-md"
                onClick={() => handleSwipe("right")}
              />
            </div>
          </>
        ) : (
          // 🐾 Results Page
          <div className="text-center mt-20 px-6 animate-fadeIn">
            <h2 className="text-4xl font-baloo font-extrabold text-primary drop-shadow">
              All Done! 🎉
            </h2>

            <p className="mt-3 text-lg text-gray-700 font-baloo">
              You liked{" "}
              <span className="text-primary font-bold">{liked.length}</span> cute
              cats!
            </p>

            <img
              src={assets.deco5}
              className="w-16 h-16 mx-auto opacity-100 mt-4 animate-bounce"
            />

            <div className="mt-10 bg-white/60 rounded-2xl shadow-lg p-5 border border-primary/10 backdrop-blur-sm">
              <p className="font-baloo text-primary font-semibold text-lg mb-4">
                Your favourite picks 💕
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {liked.map((cat, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-md border border-primary/10 bg-white hover:shadow-xl transition-all"
                  >
                    <img
                      src={cat}
                      alt="liked cat"
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
