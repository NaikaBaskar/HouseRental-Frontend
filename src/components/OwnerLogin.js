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
import SideNavbar from './SideNavbar';
import Loadingbar from './Loadingbar';
class OwnerLogin extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      mobile: '', 
      password: '',
      loading:false
    };

    this.handleChange = this.handleChange.bind (this);
  }
  handleChange (event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState ({
      [name]: value,
    });
  }
  findOwner(){
  console.log("finfing")
  fetch (`https://house-rental-backend.herokuapp.com/owner/getOwnerByMobile`, {
          method: 'GET',
          params:{
            mobile:this.state.mobile
          }
        })
          .then (res => res.json ())
          .then (res => {
            console.log("data")
            console.log(res)
            localStorage.setItem("user",res)
          })
          .catch (error => console.log ('error', error));
}
handleSubmit = () =>{
  console.log("Submitting")
  let regexMobile=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (this.state.mobile.trim() == '' || this.state.password.trim()=='') {
      document.getElementById ('login').innerHTML = 'Fields Cannot be Empty.';
      document.getElementById ('login').style.visibility='visible';
    } 
    else if(!regexMobile.test(this.state.mobile))
    {
      document.getElementById('login').innerHTML='Please Enter Valid Mobile'
      document.getElementById ('login').style.visibility='visible';
    }
    else {
      this.setState({
        loading:true
      })
      document.getElementById ('login').style.visibility='hidden';
      fetch (`https://house-rental-backend.herokuapp.com/owner/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          mobile: this.state.mobile,
          password: this.state.password,
        }),
      })
        .then (res => res.json ())
        .then (res => {
          if (res.code === 200) {
            console.log(res.code)
            alert("login successful")
            fetch (`https://house-rental-backend.herokuapp.com/owner/getOwnerByMobile/${this.state.mobile}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              // params:{
              //   mobile:this.state.mobile
              // }
            })
              .then (res => res.json ())
              .then (res => {
                // console.log("data")
                // console.log(res)
                localStorage.setItem("user",JSON.stringify(res.data))
                localStorage.setItem('role',"owner");
                // console.log(localStorage.getItem("user"))
                this.props.history.push('/house/getHousesOfOwner')
                // console.log("Details:"+user.ownerId+user.name+user.mobile)
                // console.log(localStorage.getItem("userId"))
                this.setState({
                  loading:false
                })
                
              })
              .catch (error => console.log ('error', error));
            
            // localStorage.setItem('name',this.state.name);
           
          } else if (res.code === 401) {
            document.getElementById ('login').innerHTML ="Invalid  Password"
            //   'Mobile already taken';
            // console.log("Invalid")
            this.setState({
              loading:false
            })
            alert("Invalid Password")
          }
          else if (res.code === 402) {
            document.getElementById ('login').innerHTML ="Invalid Mobile number"
            //   'Mobile already taken';
            this.setState({
              loading:false
            })
            console.log("Invalid")
            alert("Invalid Mobile")
          }
        })
        .catch (err => {
          console.log (err);
          alert("Mobile or Password is incorrect")
          this.setState({
            loading:false
          })
        });
    }
  

}

  render () {
    if(this.state.loading)
    {
      return(
        <Loadingbar text="Logging in please wait.."></Loadingbar>
      )
    }
    else
    {
    return (
      <div id="backdesign">
      <div className="form col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10  bg-white">
        {/* col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10 */}
      <h1 className="m-3" style={{marginTop:"20px",marginBottom:"25px"}}>Owner Login</h1>
        <div>
          <FormGroup className="form-inline ">
            <FormLabel>Mobile</FormLabel>
            <FormControl
              type="number"
              name="mobile"
              placeholder="Mobile"
              onChange={this.handleChange}
              value={this.state.mobile}
              className="input col-xl-8 "
              onWheel={event => { 
                event.preventDefault(); 
                event.target.blur()}}
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
          <button className="mb-2 btn btn-success ml-2" onClick={()=>{
            localStorage.setItem("method","POST")
            this.props.history.push('/owner/signup')}}>
            SignUp
          </button>
          {/* <div>
            <h5>Don't Have an Account ? <u>SignUp</u></h5>
          </div> */}
          <div style={{marginTop:"20px",marginBottom:"10px"}}>
            <h5><u>Forgot Password</u>?</h5>
          </div>
        </div>
      

      </div>
      </div>
    );
    }
  }
}

export default withRouter(OwnerLogin);
