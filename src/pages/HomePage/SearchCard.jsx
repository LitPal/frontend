import { useState, useEffect } from "react";

import UseAnimations from "react-useanimations";
import heart from "react-useanimations/lib/heart";

function SearchCard({ title, url, citations, date, handleClick }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // check if liked or not on load
  }, []);

  const onClick = () => {
    handleClick(url);
    setLiked(!liked);
    console.log("hello", liked);
  };

  const likedArticle = (ev) => {
    // add to user's liked articles
    ev.stopPropagation();
  };
  return (
    <div
      onClick={onClick}
      className="p-10 mb-4 border shadow-md rounded-lg w-1/2 hover:bg-gray-100 flex flex-col"
    >
      <div className="flex justify-start">
        <h5 className="text-lg font-semibold mb-2">{title}</h5>
      </div>
      <div>
        <p className="">{citations}</p>
      </div>
      <div className="flex justify-between">
        <p className="">{date}</p>
        <UseAnimations
          animation={heart}
          size={35}
          reverse={true}
          onClick={likedArticle}
        />
      </div>
    </div>
  );
}

export default SearchCard;
