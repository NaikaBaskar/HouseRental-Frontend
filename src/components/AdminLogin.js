import React from 'react';
import {withRouter} from 'react-router-dom'
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Table,
} from 'react-bootstrap';
import '../docs/css/login.css'
import Loadingbar from './Loadingbar';
class AdminLogin extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '', 
      password: '',
      loading:false,
    };

    this.handleChange = this.handleChange.bind (this);
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleChange (event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState ({
      [name]: value,
    });
  }
  handleSubmit = () =>{
      if (this.state.name.trim() == '' || this.state.password.trim()=='') {
        document.getElementById ('login').innerHTML = 'Fields Cannot be Empty.';
        document.getElementById ('login').style.visibility='visible';
      } 
      else {
        this.setState({
          loading:true
        })
        if(this.state.name==="Baskar" && this.state.password==="AdminPassword@123")
        {
            document.getElementById ('login').style.visibility='hidden';
            this.setState({
                  loading:false
            })
            alert("Login Successful..!")
            localStorage.setItem("role","admin")
            this.props.history.push(`/owner/getOwners`)
        }
        else
        {
            this.setState({
                loading:false
          })
            alert("Invalid Credentials")
        }
        
      }
  }
  render () {
    if(this.state.loading)
    {
      return(
        <Loadingbar text="Logging in Please wait."></Loadingbar>
      )
    }
    else
    {
    return (
      <div id="backdesign">
      <div className="form col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10  bg-white">
        {/* col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10 */}
      <h1 className="m-3" style={{marginTop:"20px",marginBottom:"25px"}}>Admin Login</h1>
        <div>
          <FormGroup className="form-inline ">
            <FormLabel>UserName</FormLabel>
            <FormControl
              type="text"
              name="name"
              placeholder="UserName"
              onChange={this.handleChange}
              value={this.state.name}
              className="input col-xl-8 "
            />
          </FormGroup >
          <FormGroup className="form-inline">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
              className="input col-xl-8"
            />
          </FormGroup>
          <p id="login" className="warning"/>
          <button className="mb-2 btn btn-success mr-5" onClick={this.handleSubmit}>LogIn</button>
        </div>
      </div>
      </div>
    );
    }
  }
}

export default withRouter(AdminLogin);
