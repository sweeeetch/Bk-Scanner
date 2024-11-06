import React from 'react';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import type { Attendee } from '../App';

interface FileUploadProps {
  onUpload: (attendees: Map<string, Attendee>) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      const newAttendees = new Map();
      jsonData.forEach((row: any) => {
        if (row.email) {
          newAttendees.set(row.email.toLowerCase(), {
            email: row.email.toLowerCase(),
            firstName: row.firstName || row['First Name'] || '',
            lastName: row.lastName || row['Last Name'] || '',
            phoneNumber: row.phoneNumber || row['Phone Number'] || '',
            presence: 0
          });
        }
      });

      onUpload(newAttendees);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="flex items-center justify-center w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-300 cursor-pointer hover:bg-gray-50">
        <Upload className="w-5 h-5 mr-2 text-gray-600" />
        <span className="text-sm text-gray-600">Upload Excel File</span>
        <input
          type="file"
          className="hidden"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        />
      </label>
      <p className="mt-2 text-sm text-gray-500 text-center">
        Excel file should include columns: First Name, Last Name, Email, Phone Number
      </p>
    </div>
  );
}