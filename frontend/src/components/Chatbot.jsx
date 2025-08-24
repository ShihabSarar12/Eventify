import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const faqs = [
  { q: "How do I register for an event?", a: "Open an event details page and click the 'Register' button." },
  { q: "How do I unregister?", a: "Go to your dashboard or event details and click 'Unregister'." },
  { q: "Who can create events?", a: "Only Club Admins can create and manage events." },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 flex items-center justify-center rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700 transition"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <h3 className="text-sm font-semibold">Eventify Assistant</h3>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* FAQ Messages */}
          <div className="max-h-64 overflow-y-auto p-4 space-y-3 text-sm">
            {faqs.map((faq, i) => (
              <div key={i} className="space-y-1">
                <p className="font-medium text-slate-900">Q: {faq.q}</p>
                <p className="text-slate-600">A: {faq.a}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-2 text-center text-xs text-slate-500">
            Eventify FAQ Bot 🤖
          </div>
        </div>
      )}
    </>
  );
}
