import React, { use, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveFromPaste } from '../redux/PasteSlice';


const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.tittle.toLowerCase().includes(search.toLowerCase()));

  function handleDelete(pasteId) {
    dispatch(RemoveFromPaste(pasteId));
  }

  return (
    <div>
      <input className='p-2 rounded-2xl min-w-[600px] bg-black mt-5' type='search' placeholder='Search Here' value={search} onChange={(e) => setSearch(e.target.value)}>
      </input>
      <div className='fex flex-col gap-5'>
        {
          filteredData.length > 0 && filteredData.map(
            (paste) => {
              return (
                <div className='flex flex-row gap-5rounded-2xl p-5 border mt-5' key={paste._id}>
                  <div className='flex flex-col gap-5 '>
                    <h1>{paste.tittle}</h1>
                    <p>{paste.content}</p>
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>

                    <button className=' p-2 rounded-2xl text-white'>
                      <a href={`/?pasteId=${paste?._id}`}>
                         Edit
                      </a>
                    </button>

                    <button className=' p-2 rounded-2xl text-white'>
                      <a href={`/paste/${paste._id}`}>
                         view
                      </a>
                    </button>

                    <button onClick={() => handleDelete(paste._id)} className=' p-2 rounded-2xl text-white'>Delete</button>

                    <button onClick={() => { navigator.clipboard.writeText(paste?.content); toast.success("copied to clipboard") }} className=' p-2 rounded-2xl text-white'>Copy</button>

                    <button onClick={() =>{
                       if (navigator.share){
                         navigator.share({
                           title: paste.tittle,
                           text: paste.content
                         }); toast.success("shared successfully!")
                       }
                    }} className=' p-2 rounded-2xl text-white'>Share</button>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }

      </div>
    </div>
  )
}

export default Paste