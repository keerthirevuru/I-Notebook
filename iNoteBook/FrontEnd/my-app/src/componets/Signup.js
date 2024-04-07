import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
function Signup(props) {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>
    {
       //const {name,email,password}=credentials;
        e.preventDefault()
        const {name,email,password}=credentials;
        const response = await fetch('http://localhost:3002/api/auth/CreateUser', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({name,email,password})
             // body data type must match "Content-Type" header
          });
          const json = await response.json()
          console.log(json)
          if (json.success)
          {
              //save the auth token and  redirect
              localStorage.setItem('token',json.auth_token)
                navigate("/")
                props.showAlert("Account Created Successfully ","success")
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
    <div className="container">
     <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
  </div>
  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
