import React from 'react'
import Form from './Form'
import Header from './Header'

const Main = () => {
    return (
        <>
           <Header/> 
           <button className="btn btn-primary generate-button" data-toggle="modal" data-target="#outlet-detail-modal" data-dismiss="modal">Generate Cipher</button>
           <Form/>
        </>
    )
}

export default Main
