import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/PasteSlice';

const Home = () => {
  const [title, setTitle] = React.useState('');
  const [value, setValue] = React.useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allpaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId && allpaste) {
      const paste = allpaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title || '');
        setValue(paste.content || '');
      }
    }
  }, [pasteId, allpaste]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      // Add validation if needed
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-2 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          {pasteId ? 'Edit Paste' : 'New Paste'}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                type="text"
                placeholder="Enter title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && createPaste()}
              />
              <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                  {title.length}/100
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={createPaste}
            disabled={!title.trim() || !value.trim()}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
              pasteId
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } ${(!title.trim() || !value.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {pasteId ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v1a1 1 0 11-2 0v-1a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Update Paste
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create Paste
              </>
            )}
          </button>
        </div>

        <div className="relative">
          <textarea
            className="w-full p-6 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 font-mono text-sm"
            placeholder="Enter your content here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={20}
          ></textarea>
          <div className="absolute bottom-4 right-4 flex items-center">
            <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
              {value.length}/10000
            </span>
            <button
              onClick={() => setValue('')}
              className="ml-2 text-xs text-red-400 hover:text-red-300 transition-colors duration-200"
              title="Clear content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {pasteId && allpaste.find(p => p._id === pasteId) && (
          <div className="mt-4 text-sm text-gray-400">
            <p>
              Editing paste created on: {new Date(allpaste.find(p => p._id === pasteId).createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;