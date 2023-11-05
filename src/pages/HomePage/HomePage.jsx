import { useState } from "react";
import { hostURL, proxyURL } from "../../../constants";

import axios from "axios";
import Cookies from "js-cookie";

import Chatbox from "../../components/chatbox/Chatbox";
import SignOutButton from "../../components/SignOutButton";
import SearchCard from "./SearchCard";

import { useNavigate } from "react-router-dom";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const encodedQuery = encodeURIComponent(searchQuery);
    const response = await axios.get(
      `${hostURL}/get-search-queries/${Cookies.get("_auth")}/${encodedQuery}`
    );

    setSearchResults(response.data);
  };

  const onClickSearchCard = (title, url, citations, date) => {
    navigate("/display", {
      state: {
        title: title,
        url: url,
        citations: citations,
        date: date,
      },
    });
  };

  return (
    <div className="w-full h-full">
      <SignOutButton className="m-5" />
      <form onSubmit={onSubmit} className="my-10 flex justify-center w-full">
        <div>
          <input
            type="text"
            placeholder="Search for articles..."
            className="border-2 p-2 rounded-md w-96"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="ml-2 bg-gray-400 text-white p-2 px-2 rounded-md"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="flex flex-col items-center">
        {searchResults.length > 0 &&
          searchResults.map((result, ind) => (
            <SearchCard
              key={ind}
              title={result.title}
              url={result.url}
              citations={result.citations}
              date={result.date}
              handleClick={onClickSearchCard}
            />
          ))}
      </div>
    </div>
  );
}

// <EReader
//   fileURL={
//     "https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf"
//   }
// />
export default HomePage;
