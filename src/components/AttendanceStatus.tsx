import React from 'react';
import { UserCheck, UserX } from 'lucide-react';

interface StatusProps {
  scanResult: {
    email: string;
    status: 'success' | 'error';
    message: string;
  } | null;
}

export function AttendanceStatus({ scanResult }: StatusProps) {
  if (!scanResult) return null;

  return (
    <div className={`mt-4 p-4 rounded-lg ${
      scanResult.status === 'success' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      <div className="flex items-center gap-2">
        {scanResult.status === 'success' ? (
          <UserCheck className="w-5 h-5" />
        ) : (
          <UserX className="w-5 h-5" />
        )}
        <p className="font-medium">{scanResult.email}</p>
      </div>
      <p className="mt-1">{scanResult.message}</p>
    </div>
  );
}