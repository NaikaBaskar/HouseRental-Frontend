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
class TenantLogin extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      mobile: '', 
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
        fetch (`https://house-rental-backend.herokuapp.com/tenant/login`, {
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
            // let token = res.tokens.access.token;
            // localStorage.setItem ('token', 'Bearer ' + token);
            // alert("login successful")
            //   this.props.history.push('/house/getHouses'
            if (res.code === 200) {
              console.log(res.code)
              // localStorage.setItem('mobile',this.state.mobile);
              // const t=findOwner;
              fetch (`https://house-rental-backend.herokuapp.com/tenant/getTenantByMobile/${this.state.mobile}`, {
                method: 'GET',
                // params:{
                //   mobile:this.state.mobile
                // }
              })
                .then (res => res.json ())
                .then (res => {
                  console.log("data")
                  // console.log(res)
                  localStorage.setItem("user",JSON.stringify(res.data))
                  let user=JSON.parse(localStorage.getItem("user"))
                  // console.log("Details"+user.tenantId+user.mobile)
                  this.setState({
                    loading:false
                  })
                })
                .catch (error => console.log ('error', error));
              
              // localStorage.setItem('name',this.state.name);
              localStorage.setItem('role',"tenant");
              // console.log(res);
              // if(res.subscriber.role==='admin')
              //   this.props.history.push ('/users');
              // else  
              // {
              //   localStorage.setItem('subscriber',JSON.stringify(res.subscriber))
              //   this.props.history.push('/user')
              // }
              alert("login successful")
              // console.log(localStorage.getItem("user"))
              this.props.history.push(`/house/getHouses`)
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
              console.log("Invalid")
              this.setState({
                loading:false
              })
              alert("Invalid Mobile")
            }
           
          })
          .catch (err => {
            console.log (err);
            this.setState({
              loading:false
            })
            alert("Mobile or Password is incorrect")
          });
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
      <h1 className="m-3">Tenant Login</h1>
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
            this.props.history.push('/tenant/signup')}}>
            SignUp
          </button>
          {/* <div>
            <h5>Don't Have an Account ? <u>SignUp</u></h5>
          </div> */}
          <div>
            <h5><u>Forgot Password</u>?</h5>
          </div>
        </div>
        {/* :<div>{this.state.stage=="stage1"?<div  className="p-3">
        <FormGroup className="form-inline ">
            <FormLabel>Mobile</FormLabel>
            <FormControl
              type="text"
              name="mobile"
              placeholder="Mobile"
              onChange={this.handleChange}
              value={this.state.mobile}
              className="input1 col-xl-8 "
            />
          </FormGroup >
            <button className="btn btn-success m-3" onClick={()=>{
              fetch(`${API_URL}v1/otp/send-otp/${this.state.mobile}`,{
                 method:"POST",
                 headers:{
                    "Content-Type":"application/json"
                 }
              }).then(res=>res.json())
              .then(res=>{
                console.log(res)
              this.setState({
                requestId:res.request_id
              })})
              .catch(err=>console.log(err))
              this.setState({
                stage:"stage2"
              })
            }}>send OTP</button>
        </div>:this.state.stage=="stage2"?<div  className="p-3">
          <FormGroup className="form-inline ">
              <FormLabel>Enter OTP</FormLabel>
              <FormControl
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={this.handleChange}
                value={this.state.otp}
                className="input1 col-xl-8 "
              />
            </FormGroup >
              <button className="btn btn-success m-3" onClick={()=>{
                console.log(this.state.requestId)
                 fetch(`${API_URL}v1/otp/verify-otp/${this.state.otp}`,{
                  method:"POST",
                  headers:{
                     "Content-Type":"application/json"
                  },
                  body : JSON.stringify({
                    requestId:this.state.requestId
                  }),
               }).then(res=>res.json())
               .then(res=>{
                 console.log(res)})
               .catch(err=>console.log(err))
                this.setState({
                  stage:"stage3"
                })
              }}>Verify OTP</button>
        </div>:this.state.stage=="stage3"?<div  className="p-3">
        <FormGroup className="form-inline ">
              <FormLabel>Enter new password</FormLabel>
              <FormControl
                type="text"
                name="newpassword"
                placeholder="Enter new password"
                onChange={this.handleChange}
                value={this.state.newpassword}
                className="input1 col-xl-8 "
              />
            </FormGroup >
            <FormGroup className="form-inline ">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type="text"
                name="repassword"
                placeholder="Enter password again"
                onChange={this.handleChange}
                value={this.state.repassword}
                className="input1 col-xl-8 "
              />
            </FormGroup >
            <button className="btn btn-success m-3" onClick={()=>{
                fetch(`${API_URL}v1/reset-password/${this.state.mobile}`,{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json",
                  },
                  body : JSON.stringify ({
                    password:this.state.newpassword,
                    reEnterPassword:this.state.repassword
                  }),
                }).then(res=>res.json())
                .then(res => console.log(res))
                .catch(err => console.log(err))
                this.setState({
                  stage:"stage4"
                })
              }}>Reset Password</button>
        </div>:this.state.stage=="stage4"?<div className="p-3">
          <h5 className="text-center text-success"> Password reset successfully!</h5>
          <button className="btn btn-success" onClick={()=>{
            this.setState({
              stage:"stage0"
            })
          }}>Login</button>
        </div>:null}</div>} */}

      </div>
        {/* <div className="text-center m-2">
          <button className="btn btn-primary" onClick={()=>this.props.history.push('/')}>Back</button>
        </div> */}
      </div>
    );
    }
  }
}

export default withRouter(TenantLogin);
