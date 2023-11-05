import { useState, useEffect } from "react";
import { hostURL } from "../../../constants";

import axios from "axios";
import Cookies from "js-cookie";

import EReader from "../../components/e-reader/EReader";
import ChatBox from "../../components/chatbox/Chatbox";

import { useNavigate, useLocation } from "react-router-dom";

function DisplayPage({ title, url, citations, date }) {
  const [renderChatBox, setRenderChatBox] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };

  useEffect(() => {
    axios
      .post(`${hostURL}/post-url`, {
        token: Cookies.get("_auth"),
        url: state.url,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onDocumentLoadSuccess() {
    setRenderChatBox(true);
  }
  return (
    <div>
      <button
        className="text-white bg-gray-400 p-2 m-2 rounded-md"
        onClick={onClick}
      >
        Go to search
      </button>
      <div className="flex justify-center">
        <h1 className="text-xl font-semibold m-0">{state.title}</h1>
      </div>
      <div>
        <EReader onDocLoad={onDocumentLoadSuccess} fileURL={state.url} />
        {renderChatBox ? (
          <ChatBox className="absolute z-10 transform -translate-y-160 translate-x-170" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default DisplayPage;
