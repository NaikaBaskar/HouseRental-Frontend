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
class OTPScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      mobile: '',
      pin:'',
      user:[],
      loading:false,
      time:'',
      seconds:180,
    };
    this.timer=0
    this.handleChange = this.handleChange.bind (this);
  }
  componentDidMount = () =>{
      console.log("OTP")
      this.setState({
          user:this.props.user,
          mobile:this.props.mobile
      },()=> { 
        this.sendOTP()
        console.log(this.state.mobile +" "+this.state.user)})
     
  }
  handleChange (event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState ({
      [name]: value,
    });
  }

resendOTP = () => {
  clearInterval(this.timer)
  this.timer=0;
  this.setState({
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
            this.timer=0
            this.setState({
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
        .catch (error => console.log ('error', error));
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
  console.log("Timer started in OTP Screen");
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


goback = () =>{
  this.props.history.goBack();
}

// clearInterval(this.timer);

verify = () => {
//   this.setState({
//     otp:false,
//     login:true,
//     forgot:false
//   })
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
          this.setState({
              loading:true
          })
          console.log("verified");
          fetch (localStorage.getItem("role")=="tenant" ? `https://house-rental-backend.herokuapp.com/tenant/signup` : `https://house-rental-backend.herokuapp.com/owner/signup`, {
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
                        this.setState({
                          loading:false,
                        })
                        if (res.code === 200) {
                          console.log("Inserted")
                          // document.getElementById ('register').innerHTML = 'Created';
                          alert('You are registered');
                          clearInterval(this.timer) 
                          localStorage.getItem("role")=="tenant" ? this.props.history.push('/tenant/login') : this.props.history.push('/owner/login') 
                        } else if (res.code === 400) {
                          // document.getElementById ('register').innerHTML ="All Fields are Mandatory"
                          //   'Mobile already taken';
                          console.log("Error in inserting");
                        }
                      })
                      .catch (err => {
                        this.setState({
                          loading:false,
                        })
                        console.log (err);
                      })
            }
         else  {
          alert("Error in verifying");
        }
      })
      .catch (err => {
        this.setState({
          loading:false,
        })
        console.log (err);
      })
}
  render () {
    if(this.state.loading)
    {
      return(
        <Loadingbar text="Registering User Please wait.."></Loadingbar>
      )
    }
    else 
    {
        this.startTimer()
        return(
          <div id="backdesign">
          <div className="form col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10  bg-white">
          <h1 className="m-3" style={{marginTop:"20px",marginBottom:"25px"}}>OTP Validation</h1>
            <div>
              <FormGroup className="form-inline" style={{margin:"20px"}}>
                <FormLabel>OTP</FormLabel>
                <FormControl
                  type="number"
                  name="pin"
                  placeholder="Enter Otp"
                  onChange={this.handleChange}
                  value={this.state.pin}
                  onWheel={event => { 
                  event.target.blur()}}
                  className="input col-xl-8"
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
  }
}

export default withRouter(OTPScreen);
