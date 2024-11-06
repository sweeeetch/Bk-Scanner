import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import { Scanner } from './components/Scanner';
import { AttendanceStatus } from './components/AttendanceStatus';
import { FileUpload } from './components/FileUpload';
import { ExportButton } from './components/ExportButton';
import { AttendeeList } from './components/AttendeeList';

export interface Attendee {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  presence: number;
  lastScanned?: Date;
}

function App() {
  const [attendees, setAttendees] = useState<Map<string, Attendee>>(new Map());
  const [scanResult, setScanResult] = useState<{
    email: string;
    status: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanSuccess = (decodedText: string) => {
    const email = decodedText.trim().toLowerCase();
    
    if (attendees.has(email)) {
      const attendee = attendees.get(email)!;
      const now = new Date();
      
      if (!attendee.lastScanned || (now.getTime() - attendee.lastScanned.getTime()) > 60000) {
        const updatedAttendees = new Map(attendees);
        updatedAttendees.set(email, {
          ...attendee,
          presence: attendee.presence + 1,
          lastScanned: now
        });
        
        setAttendees(updatedAttendees);
        setScanResult({
          email,
          status: 'success',
          message: `Attendance recorded for ${attendee.firstName} ${attendee.lastName}! Count: ${attendee.presence + 1}`
        });
      } else {
        setScanResult({
          email,
          status: 'error',
          message: 'Please wait 1 minute between scans'
        });
      }
    } else {
      setScanResult({
        email,
        status: 'error',
        message: 'Email not registered in the system'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            BK Scanner
          </h1>

          <div className="space-y-6">
            {attendees.size === 0 ? (
              <div className="text-center p-4 sm:p-8 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Upload Attendee List
                </h2>
                <FileUpload onUpload={setAttendees} />
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {!isScanning ? (
                    <button
                      onClick={() => setIsScanning(true)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <QrCode className="w-5 h-5" />
                      Scan Now
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsScanning(false)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Close Scanner
                    </button>
                  )}
                  <ExportButton attendees={attendees} />
                </div>

                {isScanning && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Scanner
                      onScanSuccess={handleScanSuccess}
                      isScanning={isScanning}
                    />
                  </div>
                )}

                <AttendanceStatus scanResult={scanResult} />
                <AttendeeList attendees={attendees} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;