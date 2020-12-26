import React from 'react'

const Button = (props) => {
    const { onClick, children, className="btn-default" } = props
    return (
        <button onClick={onClick} className={`btn ${className} btnWidth`}>
            {children}
        </button>
    )
}

export default Button
