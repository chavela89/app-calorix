
import { useState, useEffect } from "react";
import { Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VoiceSearchProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export function VoiceSearch({ onResult, onClose }: VoiceSearchProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);
  const { translate, language } = useLanguage();

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    // Start recording immediately when component mounts
    startRecording();
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    
    if (!isSupported) {
      toast({
        title: translate("voice_not_supported"),
        description: translate("voice_not_supported_description"),
        variant: "destructive"
      });
      onClose();
      return;
    }

    // Animation loop for visual feedback
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 8);
    }, 300);

    // In a real app, we would use the Web Speech API
    // For demo purposes, we'll simulate a recording with a timeout
    setTimeout(() => {
      clearInterval(interval);
      setIsRecording(false);

      // Demo result - in a real app this would come from the Speech API
      const demoResults = [
        "куриная грудка",
        "яблоко",
        "банан",
        "молоко",
        "овсянка",
        "гречка"
      ];
      
      const result = demoResults[Math.floor(Math.random() * demoResults.length)];
      onResult(result);
      
      toast({
        title: translate("voice_recognized"),
        description: result,
      });
    }, 3000);

    return () => clearInterval(interval);
  };

  const stopRecording = () => {
    setIsRecording(false);
    onClose();
  };

  if (!isSupported) {
    onClose();
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={() => stopRecording()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{translate("voice_search")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6">
          <div className="relative mb-6">
            <Mic 
              className={`h-16 w-16 text-primary ${isRecording ? 'animate-pulse' : ''}`} 
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {isRecording && Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i}
                  className={`absolute h-24 w-24 rounded-full border-2 border-primary/20 transition-all duration-300 ${
                    i === animationStep ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{ 
                    transitionDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          </div>
          
          <p className="text-center text-muted-foreground mb-6">
            {isRecording 
              ? (language === "ru" ? "Слушаю..." : "Listening...") 
              : (language === "ru" ? "Обработка..." : "Processing...")}
          </p>
          
          <Button 
            variant="secondary" 
            onClick={stopRecording}
          >
            <X className="mr-2 h-4 w-4" />
            {translate("cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
