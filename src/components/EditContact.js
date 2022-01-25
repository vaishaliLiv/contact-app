import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const withRouter = WrappedComponent => props => {
   // const params = useParams();
    const param1 = useLocation();
    const params = param1.state.contact;

    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        params={params}
        // etc...
      />
    );
  };

class EditContact extends React.Component {
constructor(props) {
    super(props)
    const {id, name, email} = props.params;
    this.state = {
        id,
        name,
        email
    }
}

  
    update = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === "" ) {
            alert("All fields are mandatory!");
            return;
        }

        this.props.updateContactHandler(this.state);
        this.setState({name: "", email: ""});
        window.location.href= "/";
    }
        render() {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" 
                        value = {this.state.name}
                          onChange= { (e) => this.setState({name: e.target.value})}></input>
                        </div>
                        <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" 
                        value = {this.state.email}
                        onChange= { (e) => this.setState({email: e.target.value})}></input>
                        </div>
                        <button className="ui button blue">Update</button>

                </form>
            </div>
        );
    }
}

export default withRouter(EditContact);