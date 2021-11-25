import React, {useEffect, useState} from "react";
import 'App.css';
import {nanoid} from "nanoid";
import cn from 'classnames'

function App() {
    const [data, setData] = useState(null)
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        localStorage.setItem('userId', nanoid())
        setIsLoading(true)
        fetch('/api').then(response => response.json()).then(data => {
            setIsLoading(false)
            setData(data)
        })
    }, [])

    const handleChange = (e) => setValue(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({message: value, userId: localStorage.getItem('userId')})
        }).then(response => response.json()).then(data => {
            setIsLoading(false)
            setData(data)
            setValue('')
        })
    }
    const handleRemove = (id) => {
        fetch(`/api?id=${id}`, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            setData(data)
        })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className='form'>
                <input onChange={handleChange} value={value}/>
                <button onSubmit={handleSubmit}>Ok</button>
            </form>
            {/** Нужно реализовать иконку загрузки **/}
            {!data && 'Loading...'}
            <div className='container-messages'>
                {!data?.length ? "Сообщений пока нет" : data?.map(({message, id, userId}) => <div
                    className={cn('message my-message', {'message anonymous-message': userId !== localStorage.getItem('userId')})}
                    key={id}>{message}{' '}
                    <i onClick={() => handleRemove(id)} className="fa fa-times" aria-hidden="true"></i></div>)

                }
            </div>
        </div>
    );
}

export default App;
