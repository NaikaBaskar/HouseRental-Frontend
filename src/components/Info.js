import React from 'react'


function Info(props) {
    return (
        <div>
            <section id="about">
		        <div className="about-text">
			        <h1>About Us!</h1>
			        <h2>BlueSky Homes</h2>
			        <p> Our home-solutions firm, BlueSky, was established in RGUKT BASAR by Madhan Gundu,Pramodh Sathri,Baskar Naika and Abhishek Kolluri in January 2021. All four founders had experienced a common problem – finding a home in the big city. Young people faced different kinds of discrimination. Single women and bachelors are considered unreliable. Migrants from other places are viewed with suspicion as they appear as ‘foreigners’ in a new city. Further, many newcomers did not have the knowhow to get around, lacking access to local insights in a new city.

We concluded that people leaving homes to relocate to another city needed more than just a house. They needed a place they could call home, a community where they would be accepted and a platform which allows connections to various other access points. </p>
			        {/* <button>More Details</button> */}
		        </div>
		        <div className="about-model">
			        <img src={props.image} alt="model"/>
		        </div>
	        </section>
        </div>
    )
}

export default Info
