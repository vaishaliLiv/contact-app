import React, {useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import uuid from 'react-native-uuid';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ContactDelete from "./ContactDelete";

function App() {

  const [contacts, setContacts] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";

  const addContactHandler =  (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid.v4(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect (() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)));
    if(retrieveContacts) setContacts(retrieveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // const contacts = [
  //   {
  //     id: "1",
  //     name: 'Vaishali',
  //     email: "vdesai@gmail.com"
  //   },
  //   {
  //     id: "2",
  //     name: 'Shashank',
  //     email: "shanky@gmail.com"
  //   }
  // ]

  return (
    <div className="ui container">
       <Header />
      <Router>
        <Routes>
          <Route path="/add" element={ <AddContact addContactHandler= {addContactHandler} /> } />
          <Route path="/" element= { <ContactList contacts= {contacts} getContactId={removeContactHandler}/> } />
          <Route path="/contact/:id" element= { <ContactDetails /> } />
          <Route path="/delete/:id" element= { <ContactDelete getContactId={removeContactHandler}/> } />
        </Routes>
    {/* <AddContact addContactHandler= {addContactHandler}/>
    <ContactList contacts= {contacts} getContactId={removeContactHandler} />
    */}
      </Router>
    </div>
  );
}

export default App;
