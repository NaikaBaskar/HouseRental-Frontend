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
        method:'POST',
    },
    ownerId:''
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
        ownerId:temp.ownerId
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
    // "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$"
    if (
      this.state.user.name.trim()==''||
      this.state.user.dob.trim()==''||
      this.state.user.gender.trim()==''||
      // this.state.user.mobile.trim()==''||
      this.state.user.email.trim()==''||
      // this.state.user.aadhar.trim()==''||
      this.state.user.password.trim()==''||
      this.state.user.hno.trim()==''||
      this.state.user.village.trim()==''||
      this.state.user.district.trim()==''
      // this.state.user.pin.trim()==''
    ) {
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
    // else if(!regexPassword.test(this.state.user.password))
    // {
    //   document.getElementById('register').innerHTML=" Password must contain atleast a letter and number of length 8";
    //   document.getElementById ('register').style.visibility='visible';
    // }
    else if(!regexAadhar.test(this.state.user.aadhar))
    {
      document.getElementById('register').innerHTML="Aadhar Number is Invalid";
      document.getElementById ('register').style.visibility='visible';
    }
    else {
        document.getElementById('register').style.visibility='hidden'
       {localStorage.getItem("method")=="POST" ?
          fetch (`https://house-rental-backend.herokuapp.com/owner/signup`, {
                      method: 'post',
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
                        if (res.code === 200) {
                          console.log("Inserted")
                          document.getElementById ('register').innerHTML = 'Created';
                          alert('You are registered');
                          this.props.history.push('/owner/login');
                        } else if (res.code === 400) {
                          document.getElementById ('register').innerHTML ="All Fields are Mandatory"
                          //   'Mobile already taken';
                          console.log("Error in inserting");
                        }
                      })
                      .catch (err => {
                        console.log (err);
                      })
                 :
                fetch (`https://house-rental-backend.herokuapp.com/owner/updateOwner/${this.state.ownerId}`, {
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
                              console.log (err);
                            });
                          
            }
        }      
    }


  render () {
    return (
      <div id="backdesign">
      <div className="form  bg-white">
        {localStorage.getItem("method")=="POST"?<h1>Register as Owner</h1>:<h1>Update Profile</h1>}
        {localStorage.getItem("method")=="POST" ? null:
        <FormGroup className="form-inline">
          <FormLabel>Id</FormLabel>
          <FormControl
            type="text"
            name="id"
            placeholder="Id"
            // onChange={this.handleChange}
            disabled={true}
            value={JSON.parse(localStorage.getItem("user")).ownerId}
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
            required
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
            disabled={localStorage.getItem("method")=="PATCH"?true:false}
            className="input col-xl-8"
            required
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
                required
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
                  value="male"
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  id="female"
                  onChange={this.handleChange}
                  value="female"
                />
                <Form.Check 
                  type="radio"
                  label="Other"
                  name="gender"
                  id="other"
                  onChange={this.handleChange}
                  value="other"
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
            required
          />
        </FormGroup>
        <FormGroup className="form-inline">
          <FormLabel>Aadhar</FormLabel>
          <FormControl
            type="text"
            name="aadhar"
            placeholder="Aadhar Number"
            onChange={this.handleChange}
            value={this.state.user.aadhar}
            disabled={localStorage.getItem("method")=="PATCH"?true:false}
            className="input ml-3"
            required
          />
        </FormGroup>
        {localStorage.getItem("method")=="PATCH" ? null:
        <FormGroup className="form-inline">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            name="password"
            value={this.state.user.password}
            onChange={this.handleChange}
            placeholder="Password"
            // disabled={this.state.method=="PATCH"?true:false}
            className="input ml-3"
            required
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
            required
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
            required
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
            required
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
            // disabled={this.state.method=="PATCH"?true:false}
            className="input ml-3"
            required
          />
        </FormGroup>
        <p id="register" className="warning"/>
        <button className="mb-2 btn btn-success mr-4" onClick={()=>this.props.history.goBack()}>Back</button>
        {/* <button className="mb-2 btn btn-success ml-2">{this.state.method=="PATCH"?"Update":"Create"}</button> */}
        {localStorage.getItem("method")=="POST" ? 
        <button className="mb-2 btn btn-success ml-2" onClick={this.handleSubmit}>Create</button> :
        <button className="mb-2 btn btn-success ml-2" onClick={this.handleSubmit}>Update</button> }
      </div>
      </div>
    );
  }
}

export default withRouter(OwnerSignUp);
