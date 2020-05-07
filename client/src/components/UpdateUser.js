import React, {useState, useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

function UpdateUser(props){
    const history = useHistory()
const [user, setUser] = useState({
    id: props.users.id,
    name: props.users.name,
    bio: props.users.bio
})

const changeHandler =e => {
    e.preventDefault();
    setUser({
        ...user, [e.target.name]: e.target.value
    })
}

const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:8502/api/users/${props.users.id}`, user)
    .then(res => {
        console.log(res);
        history.push('/');
        history.go(0);
    })
}
    return(
        <div className="updateUser">
        {!props.users && (<div className="loading">Loading...</div>)}
        <form onSubmit={handleSubmit}>
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
export default UpdateUser