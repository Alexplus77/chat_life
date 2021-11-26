import React, {useEffect, useState} from "react";
import 'App.css';
import {nanoid} from "nanoid";
import Message from "./components/Message";
import Loading from "./components/Loading";

function App() {
    const [data, setData] = useState(null)
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isResponse, setIsResponse]=useState(false)

useEffect(()=>{
    localStorage.setItem('userId', nanoid())
},[])

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:8080/messages').then(response => response.json()).then(data => {
            setIsLoading(false)
            setData(data)
        })

    },[isResponse])

    const handleChange = (e) => setValue(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsResponse(!isResponse)
        setIsLoading(true)
        fetch('http://localhost:8080/messages', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({message: value, userId: localStorage.getItem('userId')})
        }).then(response => response.json()).then(data => {
            setIsLoading(false)
            setValue('')
        })
    }

    const handleRemove = (id) => {
        setIsResponse(!isResponse)
setIsLoading(true)
        fetch(`http://localhost:8080/messages/${id}`, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
setIsLoading(false)
        })
    }
    return (
        <>
        <div className='container'>
            <div className='container-messages'>
                {!data?.length && "Сообщений пока нет"}
                { data?.map((item) => <Message key={nanoid()} isLoading={isLoading} handleRemove={handleRemove} item={item}/>)}
                { isLoading && <Loading/>}
            </div>
        </div>
            <form onSubmit={handleSubmit} className='form'>
                <input className='input' onChange={handleChange} value={value}/>
                <button className='button' onSubmit={handleSubmit}>Ok</button>
            </form>
        </>
    );
}

export default App;
