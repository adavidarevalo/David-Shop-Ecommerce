import { Button } from '@chakra-ui/react';
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MdOutlineKeyboardVoice, MdKeyboardVoice } from 'react-icons/md';

interface SpeechRecognitionButtonProps {
  onChange: (e: string) => void;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({ onChange }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) return <></>;

  return (
    <Button
    color={"orange"}
    variant={listening ? "solid" : "outline"}
      size="sm"
      rounded={'full'}
      fontSize={'19px'}
      onClick={() => {
        if (listening) {
          SpeechRecognition.stopListening();
              onChange(transcript);

          resetTranscript()
          return;
        }
        SpeechRecognition.startListening();
      }}
    >
      {listening ? <MdKeyboardVoice /> : <MdOutlineKeyboardVoice />}
    </Button>
  );
};

export default SpeechRecognitionButton;
