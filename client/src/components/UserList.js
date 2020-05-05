import React, {useEffect, useState} from "react";
import axios from "axios";
import IndividualUser from "./IndividualUser";
import {addUser} from "../actions";
import {Route} from "react-router-dom"



function UserList(){
const [usersList, setUsersList] = useState();
const [user, setUser] = useState({
    name: "",
    bio: ""
});

useEffect(()=>{
    axios.get('http://localhost:8501/api/users')
    .then(res => {
        console.log(res.data);
        setUsersList(res.data);
    })
    .catch(err => {
        console.log(err)
    })
},
[])
const changeHandler = e => {
    e.preventDefault();
    setUser({
        ...user, 
        [e.target.name]: e.target.value
    })
}
return (
    <div className="userslist">
        <IndividualUser users={usersList} />
        <form onSubmit={()=>addUser(user)}>
            <input 
            type="name" 
            id="name" 
            name="name"
            placeholder="name"
            value={user.name}
            onChange={changeHandler} 
            />
            <input 
            type="textbox" 
            id="bio" 
            name="bio"
            placeholder="bio" 
            value={user.bio}
            onChange={changeHandler} 
            /> 
            <button>Add User</button>
        </form>
    </div>
)
}
export default UserList;