// import React from 'react'

// const Temp = () => {

//   const [notes, setNotes] = React.useState([]);
//   const [title, setTittle] = React.useState('');
//   const [desc, setDesc] = React.useState('');

//   const onTitleChange=(e) => {
//     setTittle(e.target.value);
//   }

//   const onDescChange=(e) => {
//     setDesc(e.target.value);
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     notes.push({ title, desc });

//     localStorage.setItem('notes', JSON.stringify(notes));

//     setTittle('');
//     setDesc('');
//   }

//   return (
//     <div>
//       <form className='flex flex-col' onSubmit={handleSubmit}>
//         <input className='p-2 bg-white text-black mb-2' onChange={onTitleChange} type="text" />
//         <textarea className='p-2 bg-white text-black' onChange={onDescChange}></textarea>
//         <button type="submit">Submit</button>
//       </form>


//       <div>
//         <h1>Available notes</h1>
//         <button onClick={() => setNotes(JSON.parse(localStorage.getItem('notes'))) }>Show Notes</button>
//         {notes.length>0 && notes.map((note) => {
//           return (
//             <div>
//               <h1>{note.title}</h1>
//               <p>{note.desc}</p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Temp