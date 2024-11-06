import React from 'react';
import type { Attendee } from '../App';

interface AttendeeListProps {
  attendees: Map<string, Attendee>;
}

export function AttendeeList({ attendees }: AttendeeListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Registered Attendees: {attendees.size}
      </h3>
      <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">First Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Last Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone Number</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Presence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from(attendees.values()).map((attendee) => (
              <tr key={attendee.email} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-sm text-gray-800">{attendee.firstName || '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{attendee.lastName || '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{attendee.email}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{attendee.phoneNumber || '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{attendee.presence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}