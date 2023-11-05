import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { hostURL } from "../../../constants";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

function Chatbox() {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleNewUserMessage = (newMessage) => {
    setMessageInputValue("");
    setAllMessages([
      ...allMessages,
      {
        sender: "user",
        message: newMessage,
        sentTime: new Date().toLocaleTimeString(),
      },
    ]);
    setIsBotTyping(true);
    postChatbotMessage(newMessage).then((chatbotResponse) => {});
  };
  const postChatbotMessage = async (messageInput) => {
    let postUrl = `${hostURL}/get-message/${Cookies.get(
      "_auth"
    )}/${messageInput}`;

    let chatbotResponse;
    return axios.get(postUrl).then((response) => {
      chatbotResponse = response.data;
      setIsBotTyping(false);
      setAllMessages([
        ...allMessages,
        {
          sender: "bot",
          message: chatbotResponse,
          sentTime: new Date().toLocaleTimeString(),
        },
      ]);
      return chatbotResponse;
    });
  };

  return (
    <div>
      <MainContainer className="border rounded-lg p-2 w-1/4">
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
                  direction:
                    message.sender === "user" ? "outgoing" : "incoming",
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

      <div className="w-16 h-16 rounded-full bg-blue-800 shadow-md"></div>
    </div>
  );
}

export default Chatbox;
