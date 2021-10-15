import React from "react"

function Book(props) {
    return (
        <div>
            <h1 style = {{textAlign : "left"}}>{props.name}</h1>
            <h4 style = {{textAlign : "left"}}>Price - {props.price}</h4>
            <p style = {{textAlign : "left"}}>Description - {props.description}</p>
            <p style = {{textAlign : "left"}}>Highlights - {props.highlights}</p>
        </div>
    )
}

export default Book