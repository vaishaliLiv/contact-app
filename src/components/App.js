import React, {useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import EditContact  from "./EditContact";
import uuid from 'react-native-uuid';
import { BrowserRouter as Router, Routes, Route, useNavigate, NavLink } from 'react-router-dom';
import ContactDelete from "./ContactDelete";
import api from '../api/contacts';
import axios from "axios";

function App() {

  const [contacts, setContacts] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Retrive Contacts

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler =  async (contact) => {
    const request = {
      id: uuid.v4(),
      ...contact
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
   // setContacts([...contacts, { id: uuid.v4(), ...contact }]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(contacts.map(contact => {
        return contact.id === id ? {...response.data} : contact;
    }));
  }

  const searchHandler = (searchTerm) =>{
   setSearchTerm(searchTerm);
   if(searchTerm != "") {
     const newContactList = contacts.filter((contact) => {
       return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
     });
     setSearchResults(newContactList);
   } else {
     setSearchResults(contacts);
   }
  };

  useEffect (() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)));
    // if(retrieveContacts) setContacts(retrieveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };

    getAllContacts();

  }, []);

  useEffect(() => {
   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
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
          <Route path="/*" element= { <ContactList contacts= {searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} 
                 term={searchTerm} searchKeyword={searchHandler}/> }>
                <Route path="newcontact" element={<p>New Contact</p>} />
          </Route>
          <Route path="/contact/:id" element= { <ContactDetails /> } />
          <Route path="/delete/:id" element= { <ContactDelete getContactId={removeContactHandler}/> } />
          <Route path="/edit" element= { <EditContact updateContactHandler={updateContactHandler}/> } />
        
        </Routes>
    {/* <AddContact addContactHandler= {addContactHandler}/>
    <ContactList contacts= {contacts} getContactId={removeContactHandler} />
    */}
      </Router>
    </div>
  );
}

export default App;
