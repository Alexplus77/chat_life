import React, {useEffect, useState} from "react";
import 'App.css';

function App() {
    const [data, setData]=useState(null)
    const [value, setValue]=useState('')
const [isLoading, setIsLoading]=useState(false)

    useEffect(()=>{
       setIsLoading(true)
        fetch('/api').then(response=>response.json()).then(data=>{
            setIsLoading(false)
            setData(data)
        })
    },[])

    const handleChange=(e)=>setValue(e.target.value)
    const handleSubmit=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        fetch('/api',{
           method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({message:value})
        }).then(response=>response.json()).then(data=>{
            setIsLoading(false)
            setData(data)
            setValue('')
        })
    }
    console.log(data)
  return (
   <div>
       <form onSubmit={handleSubmit}>
           <label>Input
               <input onChange={handleChange} value={value}/>
           </label>
           <button onSubmit={handleSubmit}>Submit</button>
       </form>
       {/** Нужно реализовать иконку загрузки **/}
       {!data && 'Loading...'}
       {!data?.length ? "Сообщений пока нет" : data?.map(({message, id})=><div key={id}>{message}</div>) }

   </div>
  );
}

export default App;
