import { useState } from "react";
import { hostURL, proxyURL } from "../constants";
import axios from "axios";

import EReader from "./components/e-reader/EReader";
// import Chatbox from "./components/chatbox/Chatbox";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([""]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${hostURL}/get_search_queries/${searchQuery}`
    );

    console.log(response.data);
    setSearchResults(response.data);
  };

  return (
    <>
      <form className="my-10 flex justify-center w-full">
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

      {searchResults.length > 0 && <div className="flex justify-center"></div>}
    </>
  );
}

// <EReader
//   fileURL={
//     "https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf"
//   }
// />
export default App;
