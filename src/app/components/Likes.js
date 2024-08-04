'use client';

import React, {useState} from 'react';



export default function LikesButton(){

    const [likes, setLikes] = useState(0);

    function handleClick(){
        setLikes(likes+1);
    }

    return(
        <div>
            <p>
                Count: {likes}
            </p>
            <button onClick={handleClick}> Like </button>
        </div>
    );
}