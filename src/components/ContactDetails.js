import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import users from '../images/users.jpeg';

const ContactDetails = () => {

    const location = useLocation();
    const {name, email} = location.state.contact;

    return (
    <div className="main" style={{marginTop:"7em"}}>
        <div className="ui card centered">
            <div className="image">
                <img src={users} alt="user"></img>
            </div>
        
        <div className="content">
            <div className="header">{name}</div>
            <div className="description">{email}</div>
        </div>
        </div>
        <div className="center-div" style={{textAlign:"center"}}>
            <Link to="/"><button className="ui button blue center">Back to Contact List</button></Link>
        </div>
    </div>
    );

}

export default ContactDetails;