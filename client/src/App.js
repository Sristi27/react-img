import logo from './logo.svg';
import {useState} from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [name,setName]=useState("");
  const [myImg,setmyImg]=useState("");
  const [response,setResponse]=useState("");
  const [errMsg,setErrMsg]=useState("");


  const [userName,setUserName]=useState('')
  const [userImg,setUserImg]=useState('')
 const [id,setID]=useState('')
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const formData= new FormData();
    formData.append('name',name);
    formData.append('myImg',myImg);
    await fetch("http://localhost:5000/uploadForm",
    {
      method:'POST',
      body:formData
    })
    .then(res=>res.json())
    .then(res=>{
      setResponse(res.message)
      setID(res.data._id)
      console.log(res)
      setUserImg("http://localhost:5000/"+ res.data.image.replace("public/", ""));
      setUserName(res.data.name)
      })
    .catch(err=>setErrMsg(err.message))
    
    }
    



  return (
    <div>
     <form onSubmit={handleSubmit} encType="multipart/form-data">
       <input type="file" accept=".png,.jpeg" name="myImg" onChange={e=>setmyImg(e.target.files[0])}></input>
       <input type="text" placeholder="Enter your name" onChange={e=>setName(e.target.value)}></input>
       <button type="submit">Submit</button>
     </form>
     {response!=''?
     <div>
     <h1>{response}</h1>
     <h2>{userName}</h2>
     <img src={userImg}/>
     </div>
     :<h1>{errMsg}</h1>}
     
    </div>
  );
}




export default App;
