import React from 'react'
import Form from './Form'
import Header from './Header'

const Main = () => {
    return (
        <div className="main-wrapper">
           <Header/> 
           <button className="btn btn-success generate-button" data-toggle="modal" data-target="#outlet-detail-modal" data-dismiss="modal">Generate</button>
           <Form/>
        </div>
    )
}

export default Main
