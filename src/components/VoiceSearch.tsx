
import { useState, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState("");
  const { translate } = useLanguage();

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }
  }, []);

  const toggleListening = () => {
    if (!isSupported) {
      toast({
        title: translate("voice_search_not_supported"),
        description: translate("voice_search_not_supported_description"),
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript("");

    // Use the SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ru-RU'; // Set to Russian by default
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      onResult(transcript);
      stopListening();
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      toast({
        title: translate("voice_search_error"),
        description: event.error,
        variant: "destructive"
      });
      stopListening();
    };

    recognition.onend = () => {
      stopListening();
    };

    try {
      recognition.start();
      toast({
        title: translate("listening"),
        description: translate("speak_now")
      });
    } catch (error) {
      console.error("Speech recognition error", error);
      stopListening();
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  if (!isSupported) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleListening}
        className="text-muted-foreground"
        disabled
      >
        <MicOff className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleListening}
      className={isListening ? "text-primary animate-pulse" : "text-muted-foreground"}
    >
      {isListening ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </Button>
  );
}
