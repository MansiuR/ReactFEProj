import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/PasteSlice';

const Home = () => {
  const [tittle, setTittle] = React.useState('');
  const [value, setValue] = React.useState('');
  const [searchParams, setSearchParams ] = useSearchParams();
  const pastId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allpaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
      if(pastId){
        const paste = allpaste.find((p) => p._id === pastId);
        setTittle(paste.tittle);
        setValue(paste.content);
      }
     }, [pastId]);

  function createpaste(){
     const paste = {
       tittle: tittle,
       content: value,
       _id: pastId || Date.now().toString(27),
       createdAt: new Date().toISOString(),
     }

     if(pastId){
        dispatch(updateToPaste(paste));
     }
     else{
        dispatch(addToPaste(paste));
     }

     setTittle('');
     setValue('');  
     setSearchParams({});
  }

  return (
   <div>
     <div className='flex flex-row gap-7 rounded-2xl place-content-between'>
      <input className='p-2 rounded-2xl mt-4 bg-black w-[200%] pl-3.5' type="text" placeholder='Enter tittle here' value={tittle} onChange={(e) => setTittle(e.target.value)} />

      <button
       onClick={createpaste}
       className='p-2 rounded-2xl  mt-2 hover:bg-blue-800 cursor-pointer'>
         {
          pastId ? "Update" : "Create"
         }
      </button>
    </div>
    <div className='mt-7'>
      <textarea className='p-4 rounded-2xl mt-4 bg-black min-w-[500px] ' type="text" placeholder='Enter Content here' value={value} onChange={(e) => setValue(e.target.value)} rows={20} ></textarea>
    </div>
   </div>
  )
}

export default Home