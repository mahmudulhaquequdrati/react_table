import React, { useState } from 'react'
import dayjs from "dayjs";

const Update = ({data, getRoute}) => {
    const [myDate, setMyDate] = useState('');
    const [hour, setHour] = useState('');
    const [nameId, setNameId] = useState('');
    const handleDateChange = (e) => {
        const d_data = e.target.value;
        const formet_date = dayjs(d_data).format("DD.MM.YYYY");
        setMyDate(formet_date);
      }
    const handleName = (e) => {
        setNameId(e.target.value);
    }
    const handleNumber = (e) => {
        setHour(e.target.value);
    }
    const submit = () => {
        console.log({myDate, hour, nameId});
        fetch(`http://localhost:5000/api/user/update/${nameId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({work: hour, date: myDate})
        })
        .then(res => res.json())
        .then(result => {
            getRoute();
            console.log(result);
            
        });
    }
  return (
    <div className='update'>
                <select
                        onChange={handleName}
                        >
                        <option>Select</option>  
                                               
                          {
                            data.map((data) => <option 
                            value={data._id}
                            key={data._id}>
                              {data.name
                            }</option> )
                          }                      
                </select>
        <input type="date" onChange={handleDateChange}/>
        <input type="number" onChange={handleNumber} />                 
        <button onClick={submit}>Update</button>
    </div>
  )
}

export default Update