import { useState } from "react";
import axios from "axios";

import { hostURL } from "../../../constants";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

function Chatbox() {
  const [messageInputValue, setMessageInputValue] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [chatBotMessages, setChatBotMessages] = useState([]);

  const handleNewUserMessage = (messageInput) => {
    setUserMessages([...userMessages, messageInput]);
    postChatbotMessage(newMessage).then((chatbotResponse) => {});
  };
  const postChatbotMessage = async (messageInput) => {
    let postUrl = hostURL + "/get-message/" + messageInput;

    let chatbotResponse;

    //Get route to receive chatbot response
    return axios.get(postUrl).then((response) => {
      chatbotResponse = response.data;
      setChatBotMessages([...chatBotMessages, chatbotResponse]);
      return chatbotResponse;
    });
  };

  return (
    <div>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "just now",
                sender: "Joe",
              }}
            />
          </MessageList>

          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => setMessageInputValue("")}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Chatbox;
