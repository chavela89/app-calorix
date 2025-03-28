
import { useState, useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { translate } = useLanguage();

  useEffect(() => {
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsSupported(false);
    }
  }, []);

  const startScanning = async () => {
    setIsScanning(true);

    if (!isSupported) {
      toast({
        title: translate("camera_not_supported"),
        description: translate("camera_not_supported_description"),
        variant: "destructive"
      });
      return;
    }

    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Simulate scanning a barcode after 3 seconds
      setTimeout(() => {
        // In a real app, you would use a library like zxing-js to scan barcodes
        const mockBarcode = "5901234123457";
        
        // Clean up camera
        stopScanning();
        
        // Return the result
        onScan(mockBarcode);
        
        toast({
          title: translate("barcode_scanned"),
          description: translate("product_found", { barcode: mockBarcode })
        });
      }, 3000);
      
    } catch (error) {
      console.error("Error accessing camera", error);
      toast({
        title: translate("camera_error"),
        description: translate("camera_permission_denied"),
        variant: "destructive"
      });
      stopScanning();
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  if (!isSupported) {
    return (
      <Button 
        variant="ghost" 
        size="icon"
        className="text-muted-foreground"
        disabled
      >
        <Camera className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={startScanning}
        className="text-muted-foreground"
      >
        <Camera className="h-5 w-5" />
      </Button>

      <Dialog open={isScanning} onOpenChange={(open) => !open && stopScanning()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{translate("scan_barcode")}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-48 border-4 border-primary rounded-lg opacity-50"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button 
              variant="secondary" 
              onClick={stopScanning}
              className="mt-2"
            >
              <X className="mr-2 h-4 w-4" />
              {translate("cancel")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
