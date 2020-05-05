import React from "react";
import {deleteUser} from '../actions';
import {useHistory, Link, Route} from "react-router-dom";



function IndividualUser(props){
    const history = useHistory();

   const users = props.users;
   console.log(users)
    return (
        <div className="UserCard">
        {!users && (<div className="loading">Loading....</div>)}    
        {users && users.map(item =>{
                return(
                    <div className="card">
                        <h3>Name: {item.name}</h3>
                        <h4>Bio: {item.bio}</h4>
                        <Link to={`/update/${item.id}`}>Update</Link>
                        
                        <button onClick={()=>{deleteUser(item.id);history.go(0)}}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default IndividualUser;