import React, { useState } from 'react'

const [text,setText] = useState('');


function test() {
    return (
        <div>
            <input type="text" onChange={(e)=> nameHandler(e)}/> 
        </div>
    )
}

export default test
