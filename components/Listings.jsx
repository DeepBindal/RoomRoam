"use client";

import { useState } from "react";
import ListingCard from "./ListingCard";
import { Input } from "@nextui-org/react";
import Hotbar from "./Hotbar";

const ListingCardList = ({ data, taxes }) => {
  return (
    <>
      {data.length > 0
        && data.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              taxes={taxes}
            />
          ))}
    </>
  );
};

const Listings = ({listings}) => {

  const category = [
    "Pool",
    "Beach",
    "Farm",
    "Trending",
    "Budget",
    "Camping",
    "Rooms",
    "Lake",
    "Arctic",
    "Caves",
    "Surfing",
    "Tropical",
    "Iconic Cities",
    "Mansions",
    "Skiing",
    "castles"
  ];

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [taxes, setTaxes] = useState(false);


  const filterListings = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return listings.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.location) ||
        regex.test(item.country) ||
        regex.test(item.category)
    );
  };

  const handleHotbarclick = (item) => {
    setSearchText(item);
    console.log(item);
    const searchedResults = filterListings(item);
    console.log(searchedResults);
    setSearchedResults(searchedResults);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterListings(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <>
      {/* <div className="feed"> */}
      <h1 className="head_text my-4">Discover & Share</h1>
        <form className="relative w-[80%] flex-center">
          <Input
            type="text"
            color="primary"
            placeholder="Search for a stay you like!"
            value={searchText}
            onChange={handleSearchChange}
            required
            // className="search_input peer w-full"
          />
        </form>
      {/* </div> */}
      {/* <button onClick={setTaxes(!taxes)}>Click me</button> */}
      <div className="w-[80%]">
      <Hotbar
        category={category}
        taxes={taxes}
        setTaxes={setTaxes}
        handleHotbarclick={handleHotbarclick}
      />
      </div>
      {/* All Prompts */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16 mt-10">
        {searchText ? (
          searchedResults.length > 0 ? (<ListingCardList
            data={searchedResults}
            taxes={taxes}
            // handleClick={handleClick}
          />) : (<p>Search for something else</p>)
          
        ) : (
          <ListingCardList
            data={listings}
            taxes={taxes}
            // handleClick={handleClick}
          />
        )}
      </div>
    </>
  );
};

export default Listings;