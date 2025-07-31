import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Viewpaste = () => {

  const {id} = useParams();
  const allpaste = useSelector((state) => state.paste.pastes);    

  const paste = allpaste.find((p) => p._id === id);

  const [tittle, setTittle] = React.useState(paste.tittle);
  const [value, setValue] = React.useState(paste.content);


  return (
    <div>
     <div className='flex flex-row gap-7 rounded-2xl place-content-between'>
      <input className='p-2 rounded-2xl mt-2 bg-black w-[80%] pl-3.5 cursor-not-allowed' type="text" placeholder='Enter tittle here' value={tittle}  disabled onChange={(e) => setTittle(e.target.value)} />

     
    </div>
    <div className='mt-7'>
      <textarea className='p-4 rounded-2xl mt-4 bg-black min-w-[500px] cursor-not-allowed ' type="text" placeholder='Enter Content here' disabled value={value} onChange={(e) => setValue(e.target.value)} rows={20} ></textarea>
    </div>
   </div>
  )
}

export default Viewpaste