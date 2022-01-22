import React from 'react';
import user from '../images/user.png';
import {Link} from 'react-router-dom';

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
//   onClick={() => props.clickHandler(id)}></i>

    return (

        <div className="item" key={id}>
            <img className="ui avatar image" src={user} alt="user"></img>
                <div className="content">
                    <Link to={`/contact/${id}`} state={{contact: props.contact}}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                    </Link>
                </div>
                <Link to={`/delete/${id}`} state={{contact: props.contact}}><i className="trash alternate outline icon" 
                   style={{color:"red", marginTop: ".5em", float:"right" }}></i></Link>
                
        </div>
    );
}

export default ContactCard;

