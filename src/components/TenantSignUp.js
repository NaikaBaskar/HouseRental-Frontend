import React from 'react';
import '../docs/css/login.css';
import {withRouter} from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Table,
} from 'react-bootstrap';
import Loadingbar from './Loadingbar';
import OTPScreen from './OTPScreen';

class OwnerSignUp extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
     user:
     {
        name: '',         
        mobile:'',
        dob:'',
        gender:'',
        email:'',
        aadhar:'',
        password:'',
        hno:'',
        village:'',
        district:'',
        pin:'',
        
    },
    tenantId:'',
    add:false,
    update:false
  };
    this.handleChange = this.handleChange.bind (this);
  }
  componentDidMount() {
    let val=localStorage.getItem('method');
    if(val=="PATCH")
    {
      let temp=JSON.parse(localStorage.getItem('user'));
      // console.log('register',subscriber)
      this.setState ({
        user: Object.assign ({}, this.state.user, {
            name: temp.name,
            mobile:temp.mobile,
            dob:temp.dob.substring(0,10),
            gender:temp.gender,
            email:temp.email,
            aadhar:temp.aadhar,
            password:temp.password,
            hno:temp.hno,
            village:temp.village,
            district:temp.district,
            pin:temp.pin,
        }),
        tenantId:temp.tenantId
      });
    }
  }
  handleChange (event) {
      this.setState ({
        user: Object.assign ({}, this.state.user, {
            [event.target.name]: event.target.value,
        }),
      });
  }
  handleSubmit = () =>{
    let regexMail=/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,20})?$/;
    let regexPassword=/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,20}$/;
    let regexMobile=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let regexAadhar=/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    let regexPin=/^[1-9]{1}[0-9]{2}{0, 1}[0-9]{3}$/
    localStorage.setItem("role","tenant")
    // "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$"
    if (
      this.state.user.name.trim()==''||
      this.state.user.dob.trim()==''||
      this.state.user.gender.trim()==''||
      this.state.user.email.trim()==''||
      this.state.user.password.trim()==''||
      this.state.user.hno.trim()==''||
      this.state.user.village.trim()==''||
      this.state.user.district.trim()=='' || 
      this.state.user.pin==''
    ) {
      alert("Fields Cannot be Empty")
      document.getElementById ('register').innerHTML =
        'Fields Cannot be Empty';
      document.getElementById ('register').style.visibility='visible';
    }
    else if(this.state.method=="POST" && this.state.password.trim()=='')
    {
      document.getElementById ('register').innerHTML =
        'Fields Cannot be Empty';
      document.getElementById ('register').style.visibility='visible';
    }
    else if(!regexMobile.test(this.state.user.mobile))
    {
      document.getElementById('register').innerHTML="Mobile number is invalid";
      document.getElementById ('register').style.visibility='visible';
    }
    else if(!regexMail.test(this.state.user.email))
    {
      document.getElementById('register').innerHTML="Email is invalid";
      document.getElementById ('register').style.visibility='visible';
    }
    else if(!regexAadhar.test(this.state.user.aadhar))
    {
      document.getElementById('register').innerHTML="Aadhar Number is Invalid";
      document.getElementById ('register').style.visibility='visible';
    }
    else if(this.state.method=="POST" && !regexPassword.test(this.state.user.password))
    {
      document.getElementById('register').innerHTML="Password Should Contain characters and digit of minimum length 8";
      document.getElementById ('register').style.visibility='visible';
    }
    else {
          {localStorage.getItem("method") == "POST" ? this.setState({
            add:true
          }):
          this.setState({
            update:true
          })
          }
        document.getElementById('register').style.visibility='hidden'
       {localStorage.getItem("method")=="POST" ? 
    
            this.setState({
              add:true
            })
            // ,()=>{this.props.history.push({
            //    pathname:`/otpScreen`, 
            //   // state: {user: this.state.user,mobile:this.state.user.mobile}
            // })})
            : 
          // fetch (`https://house-rental-backend.herokuapp.com/tenant/signup`, {
          //             method: 'post',
          //             headers: {
          //               'Content-Type': 'application/json',
          //             },
          //             body: JSON.stringify ({
          //               name : this.state.user.name,
          //               dob:this.state.user.dob,
          //               gender:this.state.user.gender,
          //               mobile:this.state.user.mobile,
          //               email:this.state.user.email,
          //               aadhar:this.state.user.aadhar,
          //               password:this.state.user.password,
          //               hno:this.state.user.hno,
          //               village:this.state.user.village,
          //               district:this.state.user.district,
          //               pin:this.state.user.pin
          //             }),
          //           }).then(res =>res.json())
          //             .then (res => {
          //               this.setState({
          //                 add:false,
          //                 update:false
          //               })
          //               if (res.code === 200) {
          //                 console.log("Inserted")
          //                 document.getElementById ('register').innerHTML = 'Created';
          //                 alert('You are registered');
          //                 this.props.history.push('/tenant/login');
          //               } else if (res.code === 400) {
          //                 document.getElementById ('register').innerHTML ="All Fields are Mandatory"
          //                 //   'Mobile already taken';
          //                 console.log("Error in inserting");
          //               }
          //             })
          //             .catch (err => {
          //               this.setState({
          //                 add:false,
          //                 update:false
          //               })
          //               console.log (err);
          //             })
                fetch (`https://house-rental-backend.herokuapp.com/tenant/updateTenant/${this.state.tenantId}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify ({
                              name : this.state.user.name,
                              dob:this.state.user.dob,
                              gender:this.state.user.gender,
                              mobile:this.state.user.mobile,
                              email:this.state.user.email,
                              aadhar:this.state.user.aadhar,
                              password:this.state.user.password,
                              hno:this.state.user.hno,
                              village:this.state.user.village,
                              district:this.state.user.district,
                              pin:this.state.user.pin
                            }),
                          }).then(res =>res.json())
                            .then (res => {
                              this.setState({
                                add:false,
                                update:false
                              })
                              if (res.code === 200) {
                                    console.log("Updated")
                                    localStorage.setItem("user",JSON.stringify(res.data))
                                    alert("Updated")
                                    this.props.history.goBack();
                                    document.getElementById ('register').innerHTML = 'Updated';
                              } else if (res.code === 400) {
                                document.getElementById ('register').innerHTML ="All Fields are Mandatory"
                                //   'Mobile already taken';
                                console.log("Error in Updating");
                              }
                            })
                            .catch (err => {
                              this.setState({
                                add:false,
                                update:false
                              })
                              console.log (err);
                            });
                          
            }
        }      
}
  render () {
    if(this.state.add || this.state.update)
    {
      if(this.state.add)
      {
        return(
          <OTPScreen user={this.state.user} mobile={this.state.user.mobile}></OTPScreen>
        )
      }
      else
      {
        return(
          <Loadingbar text="Updating Your Details..."></Loadingbar>
        )
      }
      
    }
    else
    {
        return (
          <div id="backdesign">
          <div className="form  bg-white">
            {localStorage.getItem("method")==="POST"?<h1 style={{marginTop:"20px",marginBottom:"25px"}}>Register as Tenant</h1>:<h1 style={{marginTop:"20px",marginBottom:"25px"}}>Update Details</h1>}
            {localStorage.getItem("method")=="POST" ? null:
            <FormGroup className="form-inline">
              <FormLabel>Tenant Id</FormLabel>
              <FormControl
                type="text"
                name="id"
                placeholder="Id"
                // onChange={this.handleChange}
                disabled={true}
                value={JSON.parse(localStorage.getItem("user")).tenantId}
                className="input col-xl-8"
                required
              />
            </FormGroup> }
            <FormGroup className="form-inline">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleChange}
                value={this.state.user.name}
                className="input col-xl-8"
              />
            </FormGroup>
            <FormGroup className="form-inline">
              <FormLabel>Mobile</FormLabel>
              <FormControl
                type="number"
                name="mobile"
                placeholder="Mobile"
                onChange={this.handleChange}
                value={this.state.user.mobile}
                onWheel={event => { 
                  event.target.blur()}}
                disabled={localStorage.getItem("method")=="PATCH"?true:false}
                className="input col-xl-8"
              />
            </FormGroup>
            <FormGroup className="form-inline">
                  <FormLabel>Dob</FormLabel>
                  <FormControl
                    type="date"
                    name="dob"
                    placeholder="Dob"
                    onChange={this.handleChange}
                    value={this.state.user.dob}
                    className="input ml-3"
                  />
              </FormGroup>
              <FormGroup id="radio-btn" className="form-inline">
              <FormLabel id="label1">Gender</FormLabel>
              <fieldset id="radio" >
              
                <Form.Group className="input form-inline" onChange={this.handleChange}>
                    <Form.Check 
                      type="radio"
                      label="Male"
                      name="gender"
                      id="male"
                      onChange={this.handleChange}
                      value="Male"
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      id="female"
                      onChange={this.handleChange}
                      value="Female"
                    />
                    <Form.Check 
                      type="radio"
                      label="Other"
                      name="gender"
                      id="other"
                      onChange={this.handleChange}
                      value="Other"
                    />
                </Form.Group>
                
              </fieldset>
              </FormGroup>
            <FormGroup className="form-inline">
              <FormLabel>Email</FormLabel>
              <FormControl
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.user.email}
                className="input ml-3"
              />
            </FormGroup>
            <FormGroup className="form-inline">
              <FormLabel>Aadhar</FormLabel>
              <FormControl
                type="text"
                name="aadhar"
                placeholder="Aadhar Number"
                onChange={this.handleChange}
                onWheel={event => { 
                  event.target.blur()}}
                value={this.state.user.aadhar}
                disabled={localStorage.getItem("method")=="PATCH"?true:false}
                className="input ml-3"
              />
            </FormGroup>
            {localStorage.getItem("method")=="PATCH" ? null :
            <FormGroup className="form-inline">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                name="password"
                value={this.state.user.password}
                onChange={this.handleChange}
                placeholder="Password"
                disabled={this.state.method=="PATCH"?true:false}
                className="input ml-3"
              />
            </FormGroup> }
            <FormGroup className="form-inline">
              <FormLabel>Hno</FormLabel>
              <FormControl
                type="text"
                name="hno"
                value={this.state.user.hno}
                onChange={this.handleChange}
                placeholder="H.No"
                // disabled={this.state.method=="PATCH"?true:false}
                className="input ml-3"
              />
            </FormGroup>
            <FormGroup className="form-inline">
              <FormLabel>Village</FormLabel>
              <FormControl
                type="text"
                name="village"
                value={this.state.user.village}
                onChange={this.handleChange}
                placeholder="Village"
                // disabled={this.state.method=="PATCH"?true:false}
                className="input ml-3"
              />
            </FormGroup>
            <FormGroup className="form-inline">
              <FormLabel>District</FormLabel>
              <FormControl
                type="text"
                name="district"
                value={this.state.user.district}
                onChange={this.handleChange}
                placeholder="District"
                // disabled={this.state.method=="PATCH"?true:false}
                className="input ml-3"
              />
            </FormGroup>
            <FormGroup className="form-inline">
              <FormLabel>Pin</FormLabel>
              <FormControl
                type="number"
                name="pin"
                value={this.state.user.pin}
                onChange={this.handleChange}
                placeholder="Pin"
                onWheel={event => { 
                  event.target.blur()}}
                // disabled={this.state.method=="PATCH"?true:false}
                className="input ml-3"
              />
            </FormGroup>
            <p id="register" className="warning"/>
            <button className="mb-2 btn btn-success mr-4" onClick={()=>this.props.history.goBack()}>Back</button>
            {/* <button className="mb-2 btn btn-success ml-2">{this.state.method=="PATCH"?"Update":"Create"}</button> */}
            <button className="mb-2 btn btn-success ml-2" onClick={this.handleSubmit}>{localStorage.getItem("method")=="POST" ?  "Create" : "Update"}</button>
          </div>
          </div>
        );
    }
  }
}

export default withRouter(OwnerSignUp);
