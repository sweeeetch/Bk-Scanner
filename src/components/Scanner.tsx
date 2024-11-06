import React from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface ScannerProps {
  onScanSuccess: (text: string) => void;
  isScanning: boolean;
}

export function Scanner({ onScanSuccess, isScanning }: ScannerProps) {
  const videoRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let scanner: Html5Qrcode | null = null;

    const startScanning = async () => {
      if (!videoRef.current) return;

      scanner = new Html5Qrcode('reader');
      try {
        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          onScanSuccess,
          () => {}
        );
      } catch (err) {
        console.error('Error starting scanner:', err);
      }
    };

    if (isScanning) {
      startScanning();
    }

    return () => {
      if (scanner) {
        scanner.stop().catch(console.error);
      }
    };
  }, [isScanning, onScanSuccess]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div id="reader" ref={videoRef} className="rounded-lg overflow-hidden"></div>
    </div>
  );
}