import React from "react";

const Message=(message, handleRemove)=>{
    return(
        <div>
            <div className='message'>{message}</div>
            <i onClick={()=>handleRemove()} className="fa fa-times" aria-hidden="true"></i>
        </div>
    )
}
export default Message