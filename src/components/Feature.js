import React from 'react'
import FeatureBox from './FeatureBox'
import featureimage from '../images/f1.jpg'
import featureimage1 from '../images/f2.jpg'
import featureimage2 from '../images/f3.jpg'

function Feature() {
    return (
        <div id='features'>
            <section id='idea'>
            <div className="a-container">
                <FeatureBox image={featureimage} title='Find The Home'  /> 
                <FeatureBox image={featureimage1} title='Make The Deal'  />  
                <FeatureBox image={featureimage2} title='Get It'  />  
            </div> 
            </section>           
        </div>
    )
}

export default Feature
