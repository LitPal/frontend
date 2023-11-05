import { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { hostURL } from "../../../constants";

import { useSpring, animated } from "react-spring";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

function Chatbox({ className }) {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleNewUserMessage = (newMessage) => {
    console.log(newMessage);
    setMessageInputValue("");
    const newMessageObject = [
      {
        sender: "user",
        message: newMessage,
        sentTime: new Date().toLocaleTimeString(),
      },
    ];
    setAllMessages((prev) => [...prev, ...newMessageObject]);
    setIsBotTyping(true);
    postChatbotMessage(newMessage).then((chatbotResponse) => {});
  };
  const postChatbotMessage = async (messageInput) => {
    let postUrl = `${hostURL}/get-bot-message/${Cookies.get(
      "_auth"
    )}/${messageInput}`;

    let chatbotResponse;
    return axios.get(postUrl).then((response) => {
      chatbotResponse = response.data.answer;
      setIsBotTyping(false);
      setAllMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          message: chatbotResponse,
          sentTime: new Date().toLocaleTimeString(),
        },
      ]);

      return chatbotResponse;
    });
  };

  console.log(allMessages);
  return (
    <div className={"flex flex-col w-1/4 " + className}>
      <MainContainer className="border rounded-lg p-2">
        <ChatContainer>
          <MessageList
            typingIndicator={
              isBotTyping ? (
                <TypingIndicator content="LitPal is typing" />
              ) : null
            }
          >
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "just now",
                sender: "Joe",
                direction: "incoming",
              }}
            />
            {allMessages.map((message, ind) => (
              <Message
                key={ind}
                model={{
                  message: message.message,
                  sender: message.sender,
                  sentTime: message.sentTime,
                  direction: message.sender == "user" ? "outgoing" : "incoming",
                }}
              />
            ))}
          </MessageList>

          <MessageInput
            placeholder="Ask me anything..."
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={handleNewUserMessage}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Chatbox;
