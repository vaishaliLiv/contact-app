import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const ContactDelete = (props) => {
    const location = useLocation();
    const {id, name, email} = location.state.contact;

return (
    <div className="ui container delete" style={{marginTop:"7em"}}>Are you sure you want to delete {name} ?
        <Link to="/"><button className="ui button blue" onClick={() => props.getContactId(id)} >Yes</button></Link>
        <Link to="/"><button className="ui button blue">No</button></Link>
    </div>
    
);

}

export default ContactDelete;