import React, { useState, useEffect } from 'react';
import { Search, Plus, MessageCircle, Trash2, Eye } from 'lucide-react';

export default function VisionPointApp() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // New Client Data State
  const [customer, setCustomer] = useState({
    name: '', amount: '', re: '', le: '', status: 'Pending'
  });

  // 1. Data Save Logic (Local Storage)
  useEffect(() => {
    const saved = localStorage.getItem('visionData');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('visionData', JSON.stringify(entries));
  }, [entries]);

  // 2. Add New Entry (Starting at 0)
  const addEntry = () => {
    if(!customer.name || !customer.amount) return alert("Pura data bharein!");
    setEntries([customer, ...entries]);
    setCustomer({ name: '', amount: '', re: '', le: '', status: 'Pending' });
    setShowForm(false);
  };

  // 3. WhatsApp Integration
  const sendWhatsApp = (item) => {
    const msg = `*VISION POINT*\n\nCustomer: ${item.name}\nRE Power: ${item.re}\nLE Power: ${item.le}\nTotal: ₹${item.amount}\nStatus: ${item.status}\n\nThank you!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20 font-sans">
      
      {/* Header - Vision Point Branding */}
      <div className="bg-blue-600 p-10 text-white rounded-b-[50px] shadow-xl text-center">
        <h1 className="text-4xl font-black italic tracking-tight">VISION POINT</h1>
        <p className="text-sm opacity-90 mt-1">Premium Optical Solutions</p>
        <div className="mt-4 bg-white/20 py-1 px-4 rounded-full inline-block text-[10px] uppercase font-bold">
          Nexa AI Business Suite
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="flex gap-4 px-6 -mt-6">
        <div className="flex-1 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 text-center">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Total Sales</p>
          <p className="text-xl font-black text-blue-700">₹{entries.reduce((a, b) => a + Number(b.amount), 0)}</p>
        </div>
        <div className="flex-1 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 text-center">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Customers</p>
          <p className="text-xl font-black text-blue-700">{entries.length}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mt-8">
        <div className="bg-white flex items-center px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search customer name..." 
            className="ml-3 bg-transparent outline-none w-full text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Records List */}
      <div className="px-6 mt-6">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Eye size={18} className="text-blue-600" /> Recent Visits
        </h2>

        {entries.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-[25px] mb-4 shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h3>
                <div className="bg-blue-50 px-2 py-1 rounded-md mt-2 inline-block">
                  <p className="text-[10px] text-blue-700 font-bold uppercase tracking-tighter">
                    RE: {item.re} | LE: {item.le}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-xl text-blue-900">₹{item.amount}</p>
                <span className={`text-[9px] px-2 py-1 rounded-md font-bold uppercase ${item.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {item.status}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => sendWhatsApp(item)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl mt-4 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <MessageCircle size={14} /> Send Bill on WhatsApp
            </button>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button 
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-5 rounded-full shadow-2xl active:scale-90 transition z-50"
      >
        <Plus size={32} />
      </button>

      {/* Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-[100]">
          <div className="bg-white w-full rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300">
            <h3 className="text-xl font-black mb-6 text-gray-800">New Entry - Vision Point</h3>
            <input onChange={(e)=>setCustomer({...customer, name: e.target.value})} className="w-full p-4 bg-gray-100 rounded-2xl mb-3 outline-none" placeholder="Customer Name" />
            <div className="flex gap-3 mb-3">
              <input onChange={(e)=>setCustomer({...customer, re: e.target.value})} className="flex-1 p-4 bg-gray-100 rounded-2xl" placeholder="RE Power" />
              <input onChange={(e)=>setCustomer({...customer, le: e.target.value})} className="flex-1 p-4 bg-gray-100 rounded-2xl" placeholder="LE Power" />
            </div>
            <input type="number" onChange={(e)=>setCustomer({...customer, amount: e.target.value})} className="w-full p-4 bg-gray-100 rounded-2xl mb-6 font-bold" placeholder="Amount (₹)" />
            <button onClick={addEntry} className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold text-lg shadow-lg">Save Record</button>
            <button onClick={() => setShowForm(false)} className="w-full p-4 text-gray-400 font-bold">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
    }
                    
