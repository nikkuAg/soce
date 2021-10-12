import React from 'react'
import { Icon } from 'semantic-ui-react'
import './style.css'


export const Footer = () => {
    const style = {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "40px",
        width: "100%",
        fontSize: '1.2rem',
    }

    return (
        <div style={style}>
            Copyright <Icon name="copyright outline" size="small" className="extra" />GoSOCE.
            All Rights are Reserved.
        </div>
    )
}
