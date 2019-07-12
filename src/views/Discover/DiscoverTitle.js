import React from 'react'
import './instructions.css'

const headingStyle = {
    fontSize: '40px',
    lineHeight: '40px',
}


const DiscoverTitle = () => {
    return <div className="d-title"><img src={require(`../../media/discoverIcon.png`)} width="75" alt="" className="icon" />
        <div style={{headingStyle}}>Discover My Identity</div>
    </div>
}

export default DiscoverTitle