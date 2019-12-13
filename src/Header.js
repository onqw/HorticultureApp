import React from 'react'

export default function Header() {
    return (
        <html>
        <header style={headerStyle}>
            
            <h1 style={{fontSize: '50px'}}>Southwest Sierra Wildflower Club</h1>
        </header>
        
        </html>
    )
}

const headerStyle = {
    fontFamily: 'Times New Roman',// background: 'rgb(0,0,0,0.4)',
    color: 'lightgrey',
    textAlign: 'center',
    padding: '20px'
}
