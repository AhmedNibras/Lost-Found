import React, {useState, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const LoadingToRedirect = () => {
    const [count, setCount ] = useState(5);
    const navigate = useNavigate();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        }, 1000);

        count === 0 && navigate("/login");
        return () => clearInterval(interval);

    }, [count, navigate])
  return (
    <div className='mt-24'>
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  )
}

export default LoadingToRedirect