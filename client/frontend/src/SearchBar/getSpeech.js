//------------------------SPEECH RECOGNITION-----------------------------

const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

//------------------------COMPONENT-----------------------------

export function getSpeech(listening: Boolean, handleSpeechChange: (String) => void) {
  if (listening) {
    recognition.start();
  } else {
    recognition.stop();
  }

  let finalTranscript = '';
  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
        handleSpeechChange(finalTranscript);
      }
    }
  };

  recognition.onerror = (event) => {
    console.log('Error occurred in recognition: ' + event.error);
  };
}
