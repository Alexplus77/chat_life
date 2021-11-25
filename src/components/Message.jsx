import React from "react";
import cn from 'classnames'


const Message=({item, handleRemove})=>{
    const {message, userId, id}=item
    return(

        <div
            className={cn('message my-message', {'message anonymous-message': userId !== localStorage.getItem('userId')})}
            key={id}>{message}{' '}
            <i onClick={() => handleRemove(id)} className="fa fa-times" aria-hidden="true"></i>
        </div>
    )
}
export default Message