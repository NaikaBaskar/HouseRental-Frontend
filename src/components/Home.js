import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import '../docs/css/Home.css';
import Logo2 from '../images/logo2.png'
import Logo from '../images/5.ico';
import one from '../images/1.png';
import two from '../images/2.png';
import three from '../images/3.png';
import fb from '../images/facebook.png';
import twit from '../images/twitter.png';
import insta from '../images/instagram.png';
// import Loc from '../images/loca.png';
import Mail from '../images/gmail.png';
import Phone from '../images/phone.png'
import {Nav,FormControl, Form, Navbar,Button } from 'react-bootstrap';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            name:''
        }
        
    }
   imgSlider = (anything) => {
        document.querySelector('.starbucks').src = anything;
    }
 changeCircleColor = (color) => {
        const circle = document.querySelector('.circle');
        circle.style.background = color;
    }
toggleMenu= () => {
        var menuToggle = document.querySelector('.toggle');
        var navigation = document.querySelector('.navigation');
        menuToggle.classList.toggle('active')
        navigation.classList.toggle('active')
    }
   
   
   
    render()
    {
        return (
    <div className="App">
        <Navbar style={{background:"#060b26"}}>
        <a href="" className="logo"><img src={Logo}/></a>
            <Nav className="mr-auto" style={{paddingLeft:"40px"}}>
            <Nav.Link href="#" className="links">Home</Nav.Link>
            <Nav.Link href="#" className="links">About us</Nav.Link>
            {/* <Nav.Link href="#" className="links">Contact us</Nav.Link> */}
            <Nav.Link href="#" className="links">User Guide</Nav.Link>
            </Nav>
        </Navbar>
    <body>
      <section>
          <div className="circle"></div>
          <div className="content">
              <div className="textbox">
                  <h2>No more waiting..<br></br>Not <span>Anymore</span></h2>
                      <p>Everything at your fingertips. Wherever you want. Whenever you need! We are here for you!</p>
                  <Link to="/owner/login" style={{margin:"10px"}}>Owner</Link>
                  <Link to="/tenant/login">Tenant</Link>
              </div>
  
              <div className="imgbox">
                  <img src={one} className="starbucks" />
              </div>	
          </div>
          <ul className="thumb">
              <li><img src={one}  onClick={() => {
                  this.imgSlider(one)
                  console.log("one")
                  this.changeCircleColor("#017143")
              }}/></li>
              <li><img src={two} onClick= { () =>{
                  this.imgSlider(two)
                  this.changeCircleColor("#eb7495")
              }} /></li>
              <li><img src={three} onClick={() => {
                  this.imgSlider(three)
                  this.changeCircleColor("#d752b1")
              }}/></li>
          </ul>
          {/* <ul className="sci" style={{float:"right"}}>
              <li><a href=""><img src={fb} /></a></li>
              <li><a href=""><img src={twit} /></a></li>
              <li><a href=""><img src={insta} /></a></li>
          </ul> */}
      </section>
    </body>
    {/* <footer id="contact">
            <div className="content-wrap social-icons">
                <h2>Contact Us</h2>
                <div className="box-wrapper">            
                    <div id="box"> 
                        <div id="box1" className="text-center"> 
                            <h3>ADDRESS</h3>
                            <p>Kamareddy, Telangana</p>
                        </div>  
                        <div id="box2"> 
                            <img src={Mail} style={{width:"100px",height:"100px"}}></img>
                            <h3>EMAIL ADDRESS</h3>
                            <p>baskarnayak2420@gmail.com</p>
                        </div> 
                
                        <div id="box3"> 
                            <img src={Phone} style={{width:"100px",height:"100px"}}></img>
                            <h3>CONTACT NUMBERS</h3>
                            <p>+91 7981698490</p>
                            <p>+91 7997594459</p>
                        </div> 
                    </div> 
                </div> 
                <img src={fb} style={{width:"100px",height:"100px"}}></img>
                <img src={insta} style={{width:"100px",height:"100px"}}></img>
                <img src={twit} style={{width:"100px",height:"100px"}}></img>
        </div>
        </footer> */}
    </div> 
    )
  }
}
export default withRouter(Home);