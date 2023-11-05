import EReader from "../../components/e-reader/EReader";
// import ChatBox from "../../components/chatbox/Chatbox";

import { useNavigate, useLocation } from "react-router-dom";

function DisplayPage({ title, url, citations, date }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>Go to search</button>
        <h1>{state.title}</h1>
      </div>
      <EReader fileURL={state.url} />
    </div>
  );
}

export default DisplayPage;
