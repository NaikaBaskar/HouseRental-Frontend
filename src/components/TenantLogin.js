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
      cnfrm:'',
      pin:'',
      loading:false,
      forgot:false,
      otp:false,
      time:'',
      seconds:180
    };
    this.timer=0

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
  resendOTP = () => {
    console.log("Reset Timer in ten");
    clearInterval(this.timer)
    this.timer=0;
    this.setState({
      otp:true,
      login:false,
      forgot:false,
      seconds:180
    },()=> {
      console.log(this.state.seconds)
      document.getElementById("resendbtn").style.display="none"
      document.getElementById("text").style.display="unset"
      this.sendOTP()
    });
    // console.log(this.state.seconds)
    
  }
  sendOTP = () => {
    let regexMobile=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (this.state.mobile == '' || this.state.password.trim()=='' || this.state.cnfrm.trim()=='') {
        alert("Fields cannot be Empty")
        // document.getElementById ('login').innerHTML = 'Fields Cannot be Empty.';
      } 
      else if(!regexMobile.test(this.state.mobile))
      {
        alert("Please Enter valid mobile")
        // document.getElementById('login').innerHTML='Please Enter Valid Mobile'
        // document.getElementById ('login').style.visibility='visible';
      }
      else if(this.state.password!==this.state.cnfrm)
      {
        alert("Passwords must be same")
      }
      else {
        // document.getElementById ('login').style.visibility='hidden';
        fetch (`https://house-rental-backend.herokuapp.com/tenant/getTenantByMobile/${this.state.mobile}`, {
          method: 'GET',
          // params:{
          //   mobile:this.state.mobile
          // }
        })
          .then (res => res.json ())
          .then (res => {
            if(res.data===null)
            {
                alert("Invalid mobile")
            }
            else 
            {
              this.timer=0
              this.setState({
                otp:true,
                login:false,
                forgot:false,
                seconds:180
              },() => {this.startTimer()})
              console.log("phn verify"+this.state.mobile);
              
              var newPhn="+91"+this.state.mobile
              console.log("send newphn "+newPhn);
            
              fetch('https://house-rental-backend.herokuapp.com/otp/sendCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify ({ 
                    mobile:newPhn,
                    
                  }),
                })
                .then(res =>res.json())
                  .then (res => {
                      console.log("signup result "+JSON.stringify(res));
                    if (res.msg === "sent") {
                      alert("OTP has been sent to Your number")
                    } else  {
                     alert("Error in sending OTP");
                    }
                  })
                  .catch (err => {
                    alert("Error in sending OTP");
                    console.log (err);
                  })
            }
            
          })
          .catch (error => console.log ('error', error));
   
     }
  }
  
  secondsToTime = (secs) =>{
    let hours = Math.floor(secs / (60*60));
    let divisor_for_min = secs % (60*60);
    let minutes = Math.floor(divisor_for_min/60);
    let divisor_for_sec = divisor_for_min % 60;
    let seconds = Math.ceil(divisor_for_sec);
    let obj = {
        'h' : hours,
        'm' : minutes,
        's' : seconds
    };
    return obj;
  }
  
  startTimer = ()=>{
    console.log("Timer");
    console.log(this.timer) 
    console.log(this.state.seconds)
    // document.getElementById("text").style.display="none"
    if(this.timer==0 && this.state.seconds>0){
      console.log("Timer1");
        this.timer = setInterval(this.countDown,1000);
    }
  }
  
  countDown = ()=>{
    const seconds = this.state.seconds-1;
    this.setState({
        time : this.secondsToTime(seconds),
        seconds : seconds
    });
  
    if(seconds == 0){
        document.getElementById("text").style.display="none"
        document.getElementById("resendbtn").style.display="unset"
        clearInterval(this.timer);
        alert("time is up");
        // this.submitTest();
    }
  }
  
  // clearInterval(this.timer);
  
  verify = () => {
    this.setState({
      otp:false,
      login:true,
      forgot:false
    })
     var newPhn="+91"+this.state.mobile
     console.log("verify newphn "+newPhn);
    fetch('https://house-rental-backend.herokuapp.com/otp/verifyCode', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      // body: data
        body: JSON.stringify ({
          mobile:newPhn,
          code:this.state.pin,
          
        }),
      })
      .then(res =>res.json())
        .then (res => {
            console.log("verify result "+JSON.stringify(res));
          if (res.msg === "approved") {
            alert("OTP has been verified")
            console.log("verified");
            fetch('https://house-rental-backend.herokuapp.com/tenant/changePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify ({
              mobile:this.state.mobile,
              password:this.state.password
              
            }),
          })
          .then(res =>res.json())
            .then (res => {
              if (res.code === 200) {
                alert("Password Updated Succesfully")
                
              } else  {
                alert("Error in Updating Password");
              }
            })
            .catch (err => {
              console.log (err);
            })

          } else  {
            alert("Error in verifying");
          }
        })
        .catch (err => {
          console.log (err);
        })
  }
  goback = () =>{
    this.setState({
      otp:false,
      login:false,
      forgot:true
  })
  
  }
  render () {
    if(this.state.loading)
    {
      return(
        <Loadingbar text="Logging in Please wait."></Loadingbar>
      )
    }
    else if(this.state.otp)
    {
      return(
          <div id="backdesign">
          <div className="form col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10  bg-white">
          <h1 className="m-3" style={{marginTop:"20px",marginBottom:"25px"}}>OTP Validation</h1>
            <div>
              <FormGroup className="form-inline " style={{margin:"20px"}}>
                <FormLabel>OTP</FormLabel>
                <FormControl
                  type="number"
                  name="pin"
                  placeholder="Enter Otp"
                  onChange={this.handleChange}
                  value={this.state.pin}
                  onWheel={event => { 
                  event.target.blur()}}
                  className="input col-xl-8 "
                />
                </FormGroup>
                <div id="text" ><p>OTP Will Expire in  <b>{this.state.time.m} : {this.state.time.s} </b></p></div>
                <button className="btn btn-success " id="resendbtn" onClick={this.resendOTP} style={{display:"none",marginTop:"25px",marginBottom:"25px"}}>Resend</button> 
                <button className="btn btn-success" onClick={this.goback} style={{marginTop:"25px",marginBottom:"25px"}}>Back</button> 
                <button className="btn btn-success" onClick={this.verify} style={{marginTop:"25px",marginBottom:"25px"}}>Verify</button>
              </div>
                </div>
              </div> 
              )
    }
    else
    {
    return (
      <div id="backdesign">
      <div className="form col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10  bg-white">
        {/* col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10 */}
      <h1 className="m-3" style={{marginTop:"20px",marginBottom:"25px"}}>{this.state.forgot ? "Update Password" : "Tenant Login"}</h1>
        <div>
          <FormGroup className="form-inline ">
            <FormLabel>Mobile</FormLabel>
            <FormControl
              type="number"
              name="mobile"
              placeholder="Mobile"
              onChange={this.handleChange}
              value={this.state.mobile}
              onWheel={event => { 
                event.target.blur()}}
              className="input col-xl-8 "
            />
          </FormGroup >
          <FormGroup className="form-inline">
            <FormLabel> {this.state.forgot ? "Password" : "Password"}</FormLabel>
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
              className="input col-xl-8"
            />
          </FormGroup>
          {this.state.forgot ? 
          <FormGroup className="form-inline">
          <FormLabel>Confirm</FormLabel>
          <FormControl
            type="password"
            name="cnfrm"
            value={this.state.cnfrm}
            onChange={this.handleChange}
            placeholder="Confirm Password"
            className="input col-xl-8"
          />
        </FormGroup> :null
        }
          
          <p id="login" className="warning"/>
          {this.state.forgot ?  <button className="mb-2 btn btn-success mr-5" onClick={() =>{
            this.setState({
              otp:false,
              forgot:false,
              login:true
            })
          }}>Back</button> :
          <button className="mb-2 btn btn-success mr-5" onClick={this.handleSubmit}>LogIn</button> }
          {this.state.forgot ?
          <button className="mb-2 btn btn-success ml-2" onClick={this.sendOTP}>
           Send OTP
          </button>  :
          <button className="mb-2 btn btn-success ml-2" onClick={()=>{
            localStorage.setItem("method","POST")
            this.props.history.push('/tenant/signup')}}>
            SignUp
          </button> }
          {this.state.forgot ? null :
          <div>
            <h5 style={{marginTop:"20px",marginBottom:"10px"}} ><a style={{color:"black",cursor:"pointer"}}  onClick={ () => {
              this.setState({
                forgot:true,
                loading:false,
                login:false
              })
            }}>Forgot Password ?</a></h5>
          </div> }
        </div>
      </div>
      </div>
    );
    }
  }
}

export default withRouter(TenantLogin);
