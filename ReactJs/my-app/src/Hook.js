import React, {useState} from 'react'
 
function Hook(){
    const [count, setCount] = useState(0);
    const increment =()=>{
        setCount(count+1);
    };
    const decrement=()=>{
        setCount(count-1)
    }
    return(
        <div>Hook
            <h2>Counter</h2>
            <p>{count}</p>
            <button onClick={increment}>increment</button>
            <button onClick={decrement}>decrement</button>
        </div>
    )
}

export default Hook;