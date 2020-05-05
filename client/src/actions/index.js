import React, {useState, useEffect} from "react";
import axios from "axios";


export function addUser(user){
axios.post('http://localhost:8501/api/users', user)
.then(res => console.log(res))
.catch(err => console.log(err))
}


export function deleteUser(id){
    axios.delete(`http://localhost:8501/api/users/${id}`)
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)})
}
