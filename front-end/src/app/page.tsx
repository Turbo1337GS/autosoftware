"use client"


import React, { useState, useEffect } from 'react';

type Message = {
  uuid: string;
  content: string;
  timestamp: string;
};


export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    fetch('/api/')
      .then(response => response.json())
      .then(data => setMessages(data));
  }, []);

  const saveMessage = () => {
    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: newMessage })
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.uuid) {
        setMessages([...messages, {
          uuid: data.uuid,
          content: newMessage,
          timestamp: new Date().toISOString()
        }]);
        setNewMessage("");
      }
    });
  };


  const sortMessages = (key: keyof Message) => {
    const sorted = [...messages].sort((a, b) => a[key].localeCompare(b[key]));
    setMessages(sorted);
  };

  return (
    <main className="flex flex-col h-screen p-8 bg-gray-900 text-gray-100 space-y-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-semibold">Messages</h1>
      </header>
  
      {/* Sorting Buttons */}
      <div className="flex justify-center space-x-4">
        <button onClick={() => sortMessages('timestamp')} className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Sort by Time
        </button>
        <button onClick={() => sortMessages('uuid')} className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Sort by UUID
        </button>
      </div>
  
      {/* List View */}
      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-2">
          {messages.map(message => (
            <li key={message.uuid} onClick={() => setSelectedMessage(message)} className="cursor-pointer hover:bg-gray-800 px-4 py-2 rounded">
              {message.content}
            </li>
          ))}
        </ul>
      </div>
  
      {/* Add Message */}
      <div className="flex justify-between items-center">
        <input 
          type="text" 
          placeholder="Enter message..." 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          className="flex-grow bg-gray-700 p-2 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
        <button onClick={saveMessage} className="bg-green-600 hover:bg-green-500 p-2 ml-4 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Add Message
        </button>
      </div>
  
      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">Message Details</h2>
            <p className="mb-4"><strong className="text-blue-400">UUID:</strong> {selectedMessage.uuid}</p>
            <p className="mb-4"><strong className="text-blue-400">Content:</strong> {selectedMessage.content}</p>
            <p className="mb-4"><strong className="text-blue-400">Timestamp:</strong> {selectedMessage.timestamp}</p>
            <button onClick={() => setSelectedMessage(null)} className="bg-red-600 hover:bg-red-500 p-2 w-full mt-4 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
      }