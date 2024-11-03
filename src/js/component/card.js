import React from "react";
import { useContext, useState } from "react";
import {Context} from "../store/appContext.js";
import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

export const ContactCard = (props) =>{

    const { store, actions } = useContext(Context);
    return (
        <div>
            {store.contacts.map((item) => (
                <div className="card mb-3" style={{ maxWidth: "540px" }} key={item.id}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={"https://i.pravatar.cc/200" + "?u=" + item.id}
                                className="img-fluid rounded-circle"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">
                                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                </p>
                                <p className="card-text">
                                    <small className="text-body-secondary">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}