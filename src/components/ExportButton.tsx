import React from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import type { Attendee } from '../App';

interface ExportButtonProps {
  attendees: Map<string, Attendee>;
}

export function ExportButton({ attendees }: ExportButtonProps) {
  const handleExport = () => {
    const data = Array.from(attendees.values()).map(({
      firstName,
      lastName,
      email,
      phoneNumber,
      presence
    }) => ({
      'First Name': firstName || '',
      'Last Name': lastName || '',
      'Email': email,
      'Phone Number': phoneNumber || '',
      'Presence Count': presence
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

    // Auto-size columns
    const maxWidths = data.reduce((acc: { [key: string]: number }, row) => {
      Object.keys(row).forEach(key => {
        const cellLength = String(row[key as keyof typeof row]).length;
        acc[key] = Math.max(acc[key] || key.length, cellLength);
      });
      return acc;
    }, {});

    worksheet['!cols'] = Object.keys(maxWidths).map(key => ({
      wch: maxWidths[key] + 2
    }));

    XLSX.writeFile(workbook, 'attendance.xlsx');
  };

  return (
    <button
      onClick={handleExport}
      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <Download className="w-4 h-4" />
      Export Attendance
    </button>
  );
}