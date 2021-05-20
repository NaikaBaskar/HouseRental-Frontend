import React from 'react'

function About3(props) {
    return (
        <div id='about'>
            <div className="about-image">
                <img src={props.image} alt="" />
            </div>
            <div className="about-text">
                <h2> {props.title} </h2>
                <p>Finally, After Finalising the Deal, The Time Period that is, from the time of move-in to 
                    the time of move-out according to the agreement. If there is any problem occurs that is 
                    with in the list of our Terms and Conditions. We would try to solve the issue as soon as we can and 
                    the tenants can extend their period of stay by reporting it to the respective owner and the further 
                    procedure would be followed.Till that time, We hope you Enjoy Your Stay!
                    </p>
                <button> {props.button} </button>
            </div>
        </div>
    )
}

export default About3
