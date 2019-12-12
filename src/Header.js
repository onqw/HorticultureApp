import React from 'react'

export default function Header() {
    return (
        <html>
        <header style={headerStyle}>
            
            <h1>Southwest Sierra Wildflower Club</h1>
        </header>
        
        </html>
    )
}

const headerStyle = {
    background: 'rgb(0,0,0,0.4)',
    color: 'lightgrey',
    textAlign: 'center',
    padding: '20px'
}
