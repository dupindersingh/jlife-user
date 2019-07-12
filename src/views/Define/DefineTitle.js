import React from 'react'
import './instructions.css'

const headingStyle = {
    fontSize: '40px',
    lineHeight: '40px',
}

const DefineTitle = () => {
    return <div className="d-title"><img src={require(`../../media/defineIcon.png`)} width="75" alt="" className="icon" />
        <div style={{headingStyle}}>Define My Purpose</div>
    </div>
}

export default DefineTitle