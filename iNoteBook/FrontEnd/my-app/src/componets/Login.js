import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
function Login(props) {
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>
    {
       
        e.preventDefault()
        const response = await fetch('http://localhost:3002/api/auth/login', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
             // body data type must match "Content-Type" header
          });
          const json = await response.json()
          console.log(json)
          if (json.success)
          {
              //save the auth token and  redirect
              localStorage.setItem('token',json.auth_token)
                navigate("/")
                props.showAlert("Logged in Successfully ","success")
          }
          else
          {
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange = (e)=>
    {
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
  </div>
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
