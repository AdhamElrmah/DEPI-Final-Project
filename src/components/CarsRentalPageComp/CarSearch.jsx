import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchOverlay from "@/layouts/SearchOverlay";

function CarSearch({ allCars }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {searchOpen && (
        <SearchOverlay allCars={allCars} setSearchOpen={setSearchOpen} />
      )}

      <Button onClick={() => setSearchOpen(!searchOpen)}>Search</Button>
    </>
  );
}

export default CarSearch;
