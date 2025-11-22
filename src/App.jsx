import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import CatCard from "./components/CatCard";
import { assets } from "./assets/assets";

const App = () => {
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------------
  // 1. Generate cat URLs once using useMemo (no re-rerenders)
  // -------------------------------------------------------
  const catImages = useMemo(() => {
    return Array.from({ length: 10 }).map(
      (_, i) =>
        `https://cataas.com/cat?width=450&height=450&random=${Date.now()}-${i}`
    );
  }, []);

  // -----------------------------
  // 2. Preload next cat image
  // -----------------------------
  useEffect(() => {
    if (current + 1 < catImages.length) {
      const img = new Image();
      img.src = catImages[current + 1];
    }
  }, [current, catImages]);

  const handleSwipe = (dir) => {
    if (dir === "right") {
      setLiked((prev) => [...prev, catImages[current]]);
    }
    setLoading(true); // Start loading next cat
    setCurrent((prev) => prev + 1);
  };

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

              {/* Paw progress */}
              <p className="font-baloo text-primary text-lg mt-4 flex items-center gap-2">
                <span className="text-2xl">🐾</span>
                <span>{catImages.length - current} more paws to go!</span>
                <span className="text-2xl">🐾</span>
              </p>
            </div>

            {/* ------------------------------
                3. Cat card + loading skeleton
               ------------------------------ */}
           {/* Cat image wrapper (fixed size, flex centered) */}


  {/* CAT CARD WITH SWIPE + LOADING + FADE-IN */}
<div className="relative w-80 h-80 mt-30 flex items-center justify-center">

  {/* Loading skeleton */}
  {loading && (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-full bg-white/60 border border-primary/10 rounded-xl shadow-lg flex items-center justify-center animate-pulse text-3xl">
        🐾 Loading kitty...
      </div>
    </div>
  )}

  {/* Swipeable CatCard */}
  <div className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
    <CatCard
      img={catImages[current]}
      onSwipe={handleSwipe}
      onLoadComplete={() => setLoading(false)}
    />
  </div>
</div>



            {/* Buttons */}
            <div className="flex gap-10 mt-20 items-center animate-fadeIn">
              <img
                src={assets.dislike}
                className="w-20 cursor-pointer transition-transform drop-shadow-md hover:scale-110 active:scale-90"
                onClick={() => handleSwipe("left")}
              />

              <img
                src={assets.love}
                className="w-20 cursor-pointer transition-transform drop-shadow-md hover:scale-110 active:scale-90"
                onClick={() => handleSwipe("right")}
              />
            </div>
          </>
        ) : (
          // Finished page
          <div className="text-center mt-20 px-6 animate-fadeIn">
            <h2 className="text-4xl font-baloo font-extrabold text-primary drop-shadow">
              All Done! 🎉
            </h2>

            <p className="mt-3 text-lg text-gray-700 font-baloo">
              You liked <span className="text-primary font-bold">{liked.length}</span> cute cats!
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
