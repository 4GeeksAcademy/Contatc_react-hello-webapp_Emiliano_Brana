import React from "react";
import { useContext, useState } from "react";
import {Context} from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";


export const CreateContact = () => {
  
  const {actions} = useContext(Context);
  const navigate = useNavigate();
  const[newContact, setNewContact ] = useState ({});


    return (
        <>
        <div className="container">
        <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label fw-bold ">Full Name</label>
  <input onChange={(evento) => setNewContact({...newContact, name:evento.target.value})} value={newContact.name || ""}  type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>

<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label fw-bold ">Email address</label>
  <input onChange={(evento) => setNewContact({...newContact, email:evento.target.value})} value={newContact.email || ""} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>

<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label fw-bold ">Phone</label>
  <input onChange={(evento) => setNewContact({...newContact,phone:evento.target.value })} value={newContact.phone || ""} type="phone" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>

<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label fw-bold ">Address</label>
  <input onChange={(evento) => setNewContact({...newContact, address:evento.target.value})} value={newContact.address || ""} type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>

 <button  onClick={async ()=> {
  
  await actions.createContact(newContact)
  navigate("/")
  }} type="submit" className="btn btn-primary"> Submit </button>
 <Link to="/">
  <button classNameName="btn btn-primary">Back home</button>
	</Link>

</div>
        </>
    )
}