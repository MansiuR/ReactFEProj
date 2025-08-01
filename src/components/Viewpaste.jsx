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
     <div className='flex w-full flex-col gap-2 rounded-2xl place-content-between'>
      <input className='p-2 rounded-2xl mt-2 bg-black w-[80%] pl-3.5 cursor-not-allowed' type="text" placeholder='Enter tittle here' value={tittle}  disabled />
     
      <textarea className='p-4 rounded-2xl bg-black min-w-[500px] cursor-not-allowed ' type="text" placeholder='Enter Content here' disabled value={value} rows={20} ></textarea>
    </div>
  )
}

export default Viewpaste