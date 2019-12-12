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
    background: 'black',
    color: 'white',
    opacity: '0.5',
    textAlign: 'center',
    padding: '20px'
}
