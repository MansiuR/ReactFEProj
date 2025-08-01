import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveFromPaste } from '../redux/PasteSlice';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => 
    paste?.title?.toLowerCase().includes(search.toLowerCase()) ||
    paste?.content?.toLowerCase().includes(search.toLowerCase())
  );

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return 'Unknown date';
    }
  }

  function handleDelete(pasteId) {
    if (window.confirm('Are you sure you want to delete this paste?')) {
      dispatch(RemoveFromPaste(pasteId));
      toast.success('Paste deleted successfully');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Your Pastes</h1>
        
        <div className="relative mb-8">
          <input 
            className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            type="search" 
            placeholder="Search by title or content..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute right-3 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            {search ? 'No matching pastes found' : 'No pastes available yet'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData.map((paste) => (
              <div 
                key={paste._id} 
                className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2">{paste.title || 'Untitled Paste'}</h2>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">{paste.content}</p>
                    <div className="text-xs text-gray-500">
                      Created: {formatDate(paste.createdAt)}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-end">
                    <a 
                      href={`/?pasteId=${paste._id}`}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      Edit
                    </a>

                    <a 
                      href={`/paste/${paste._id}`}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      View
                    </a>

                    <button 
                      onClick={() => handleDelete(paste._id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      Delete
                    </button>

                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success('Copied to clipboard!');
                      }}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      Copy
                    </button>

                    {navigator.share && (
                      <button 
                        onClick={() => {
                          navigator.share({
                            title: paste.title || 'Untitled Paste',
                            text: paste.content,
                            url: window.location.href
                          }).then(() => toast.success('Shared successfully!'))
                          .catch(() => toast.error('Sharing failed'));
                        }}
                        className="px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors flex items-center gap-1"
                      >
                        Share
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;