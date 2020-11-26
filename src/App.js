import React, {useState} from 'react';
import UserInfo from './Component/UserInfo';
import ErrorInfo from './Component/ErrorInfo'
import {debounce} from 'lodash';
import './App.css';

function App() {

   const [fisrtUser,setFisrtUser] = useState({})
   const [secUser,setSecUser] = useState({})

   const [reqExistOne,setReqExistOne] = useState(false);
   const [reqExistTwo,setReqExistTwo] = useState(false);

  const abortControllerOne = new AbortController();
  const abortControllerTwo = new AbortController();
  const fetchUserData = (id,text) => {
         if(reqExistOne){
           abortControllerOne.abort()
           setReqExistOne(false);
         }
         if(reqExistTwo){
           abortControllerTwo.abort()
           setReqExistTwo(false);
         }
      const url = `https://api.github.com/users/${text}` 
      fetch(url,{signal: (id==='one')? abortControllerOne.signal : abortControllerTwo.signal})
        .then(res => {
           if(res.status === 200) {
             return res.json() 
           }
        }) 
        .then(data => (id==='one') ? setFisrtUser(data): setSecUser(data))
        .catch(err => console.log(err))

  }
  
  const userNamehandler = debounce((text,id) => {
    (id==='one')? setReqExistOne(true) : setReqExistTwo(true)
    fetchUserData(id,text)
  },500)

  
  return (
    <div className="App">
     <div className="nav"><h1>Compare Github Profile</h1></div> 
       <div className="user">
       <div className="card userOne">
          <input
           id="one"
           type="text" 
           className="inputbox-one" 
           onKeyUp={(e) => userNamehandler(e.target.value,e.target.id)} 
           placeholder="First Name"/>
          {(fisrtUser) ? <UserInfo userInfo={fisrtUser}/> : <ErrorInfo/>}
        </div>

        <div className="card userTwo">
            <input
             type="text"
             id="two"
             className="inputbox-two"
             onKeyUp={(e) => userNamehandler(e.target.value,e.target.id)}
             placeholder="Second User"/>
            {(secUser) ? <UserInfo userInfo={secUser}/> : <ErrorInfo/>}
        </div>
       </div>
  
    </div>
  );
}

export default App;
