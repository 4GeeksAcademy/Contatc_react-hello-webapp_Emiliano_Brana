import React from "react";
import "../../styles/home.css";
import { useContext, useEffect, useState } from "react";
import {Context} from "../store/appContext.js";
import { ContactCard } from "../component/card.js";

export const Home = () => {

	const {actions, store} = useContext(Context)

	return (
			<div class="container text-center">
			<div class="row">
			<div class="col-md-8">
		{
			store.contacts.map((item, index) =>{
				return <ContactCard key={index} name={item.name} id={item.id} address={item.address} email={item.email} phone={item.phone} />
			})
		}
		</div>
		</div>
		</div>
)};