"use client";

import { Mail, Phone, Calendar } from "lucide-react";

interface Message {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export function MessagesAdmin({ messages }: { messages: Message[] }) {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{msg.subject}</h3>
                  <p className="text-sm text-gray-600">From: {msg.name}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${msg.email}`} className="text-[#0066CC] hover:underline">
                    {msg.email}
                  </a>
                </div>
                {msg.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${msg.phone}`} className="text-[#0066CC] hover:underline">
                      {msg.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No messages yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
