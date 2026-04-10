import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Show a little notification dot after a few seconds to draw attention
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && email.trim()) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, 'support_messages'), {
          email: email.trim(),
          message: message.trim(),
          createdAt: serverTimestamp(),
          status: 'new'
        });
        
        setIsSent(true);
        // Reset after a delay
        setTimeout(() => {
          setIsOpen(false);
          setTimeout(() => {
            setIsSent(false);
            setMessage('');
            setEmail('');
          }, 300); // Wait for close animation
        }, 4000);
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Sorry, there was an error sending your message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-[90vw] sm:w-96 mb-4 overflow-hidden border border-slate-100 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none absolute bottom-16 right-0'
        }`}
      >
        {/* Header */}
        <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-emerald-400">
                <img src="https://i.ibb.co/ynwgXj1L/Logo-Convertx.png" alt="ConvertX" className="w-6 h-6 object-contain" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-emerald-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-sm">ConvertX Support</h3>
              <p className="text-emerald-100 text-xs">We typically reply in a few minutes</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-emerald-100 hover:text-white transition-colors p-1 rounded-md hover:bg-emerald-700"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Chat Body */}
        <div className="p-4 bg-slate-50 h-72 overflow-y-auto flex flex-col gap-4">
          <div className="flex gap-2 max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-emerald-600 font-bold text-xs">
              CX
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-700">
              Hi there! 👋 How can we help you scale your B2B revenue today?
            </div>
          </div>

          {isSent && (
            <div className="flex gap-2 max-w-[85%] self-end flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-600 font-bold text-xs">
                You
              </div>
              <div className="bg-emerald-500 p-3 rounded-2xl rounded-tr-none shadow-sm text-white text-sm">
                {message}
              </div>
            </div>
          )}

          {isSent && (
            <div className="flex gap-2 max-w-[85%] mt-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-emerald-600 font-bold text-xs">
                CX
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-700">
                Thanks for reaching out! A growth strategist will get back to you at <strong>{email}</strong> shortly.
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        {!isSent && (
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100">
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm px-4 py-2 border border-slate-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
            />
            <div className="relative flex items-end gap-2">
              <textarea 
                placeholder="Type your message..." 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-sm px-4 py-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow min-h-[44px] max-h-32"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                }}
              ></textarea>
              <button 
                type="submit"
                disabled={!message.trim() || !email.trim() || isSubmitting}
                className="bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send message"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        className={`relative ${isOpen ? 'bg-slate-800 hover:bg-slate-900' : 'bg-emerald-600 hover:bg-emerald-700'} text-white p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center z-50`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {showNotification && (
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </>
        )}
      </button>
    </div>
  );
}
