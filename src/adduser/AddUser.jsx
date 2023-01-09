import React, { useState } from 'react'

const AddUser = ({getRoute}) => {
    const [text, setText] = useState('');
    const submit = () => {
        fetch('http://localhost:5000/api/user/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: text}),
      })
          .then(res => res.json())
          .then(data => {
            if(data.name){
            setText("");
            getRoute();
            }
          }) 
    }
  return (
    <div className='update'>
        <div className='update'>
        <input placeholder='Name' type="text" value={text} onChange={(e) => setText(e.target.value)} />                 
        <button onClick={submit}>Post Name</button>
    </div>
    </div>
  )
}

export default AddUser