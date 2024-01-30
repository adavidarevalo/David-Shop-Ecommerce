import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react'
import Chatbot from 'react-chatbot-kit';
import { TiMessages } from 'react-icons/ti';
import ActionProvider from "./action_provider"
import MessageParser from "./message_parser"
import config from "./config"
import 'react-chatbot-kit/build/main.css';

export default function ChatbotComponent() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false)

  return (
    <Box>
      {isChatbotVisible && (
        <Box position={'fixed'} bottom={"60px"} right={"70px"}>
          <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
        </Box>
      )}
      <Button
        colorScheme="orange"
        size="lg"
        position={'fixed'}
        rounded={"full"}
        bottom={2}
        right={2}
        onClick={() => {
          setIsChatbotVisible((prev) => !prev);
        }}
      >
        <TiMessages />
      </Button>
    </Box>
  );
}


