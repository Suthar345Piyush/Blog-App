import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children , authentication = true}){
  const navigate = useNavigate()
  const [loading , setLoading] = useState(true)
  const  authStatus = useSelector(state => state.auth.status)


  useEffect(() => {

    //if(authStatus == true){
      //navigate("/")
    //}
    // else if(authStatus == false){
     // naviagate("/Login")
    //}

// authentication is always give you true and conditions are check on the basis of the authStatus bcoz sometimes it gives us false.

    if(authentication && authStatus  !== authentication){
      navigate("/Login")
    }
    else if(!authentication && authStatus !== authentication){
      navigate("/")
    }
    setLoading(false)

  }, [authStatus, authentication, navigate])


  return loading ? <h1>Loading...</h1> : <>{children}</>
}



