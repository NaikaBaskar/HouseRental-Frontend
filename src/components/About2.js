import React from 'react'

function About2(props) {
    return (
        <div id='about'>
            <div className="about-image">
                <img src={props.image} alt="" />
            </div>
            <div className="about-text">
                <h2> {props.title} </h2>
                <p>While you are indulged in getting into a Good Home.
                    We ensure all the Customers that all the Houses available in our Website are thoroughly checked
                    with all the appropriate details and verified. 
                    We also extend our support in the important phase of moving into a new rental house i.e, Finalising the
                    Deal from both the ends and Ensuring that all the Documents and Details of the necessary deal would be safe and secure
                    with us along the both the opposite parties
                </p>
                <button> {props.button} </button>
            </div>
        </div>
    )
}

export default About2
