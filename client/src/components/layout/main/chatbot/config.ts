import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Hola, En que podemos ayudarte. 🙂`, {})],
  botName: 'Techno Store Bot',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#DD6B21',
    },
    chatButton: {
      backgroundColor: '#DD6B21',
    },
  },
  state: {
    moviesTitle: ['The sound of Fredooon'],
  },
};

export default config;
