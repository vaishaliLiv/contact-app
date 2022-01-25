import React, {useRef} from 'react';
import ContactCard from './ContactCard';
import { Link, Outlet, NavLink } from 'react-router-dom';

const ContactList = (props) => {
   const inputEl = useRef("");
    const deleteContactHanlder = (id) => {
        props.getContactId(id);
    };
 
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler = {deleteContactHanlder} key= {contact.id}></ContactCard>
        );
    })

    const getSearchTerm =() => {
         props.searchKeyword(inputEl.current.value);
    }
    return (
        <div className="ui main" style={{marginTop: "3em"}}>
            <NavLink className={(navData) => navData.isActive ? 'ui red' : ''} to="/">Welcome</NavLink>
            <Outlet/>
            <h2>Contact List
            <Link to="/add"><button className="ui button blue right" style={{float:"right"}}>Add Contact</button></Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="Search Contact" className="prompt" value={props.term} onChange={getSearchTerm}/>
                    <i className="search icon"></i>
                </div>

            </div>
            <div className="ui celled list" style={{marginTop:'5em'}}> {renderContactList.length > 0 ? renderContactList : "No Contacts available"} </div>
        </div>
    );
}

export default ContactList;