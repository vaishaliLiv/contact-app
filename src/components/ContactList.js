import React from 'react';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';

const ContactList = (props) => {
    console.log(props);
  
    const deleteContactHanlder = (id) => {
        props.getContactId(id);
    };
 
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler = {deleteContactHanlder} key= {contact.id}></ContactCard>
        );
    })
    return (
        <div className="ui main" style={{marginTop: "3em"}}>
            <h2>Contact List</h2>
            <Link to="/add"><button className="ui button blue right" style={{float:"right"}}>Add Contact</button></Link>
            <div className="ui celled list" style={{marginTop:'5em'}}> {renderContactList} </div>
        </div>
    );
}

export default ContactList;