import React from 'react'

function About(props) {
    return (
        <div id='about'>
            <section id='about'>
            <div className="about-image">
                <img src={props.image} alt="" />
            </div>
            <div className="about-text">
                <h2> {props.title} </h2>
                <p>Our Flexible and User-friendly Website dives you into the doors of all the 
                    available houses,Flats or Apartments for Rent that are customized with the
                    advanced searching functionalities according to the location you need in the hour.
                    No more Hustling for the third party brokers</p>
                <button> {props.button} </button>
            </div>
            </section>
        </div>
    )
}

export default About
