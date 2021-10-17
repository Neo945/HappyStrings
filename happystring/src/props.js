import React from "react"

function Book(props) {
    return (
        <div>
            <h2>Book name - {props.name}</h2>
            <h4>Price - {props.price}</h4>
            <p>Description - {props.description}</p>
            <p>Highlights - {props.highlights}</p>
        </div>
    )
}

export default Book