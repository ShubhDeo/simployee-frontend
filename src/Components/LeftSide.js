import React from 'react';
import {Form, Button} from 'react-bootstrap';


const LeftSide = () => {
    return (
        <div className=''>
            <h1 style={{width:"80%", marginLeft:"10%", marginTop:"20%", textAlign:'left'}}>LOGIN </h1>
            <br/>
            <Form style={{width:"50%", marginLeft:"10%", marginTop:"1%", textAlign:'left'}}>
                <Form.Group >
                    <Form.Label >Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <br />
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />
                </Form.Group>
                <br />
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}


export default LeftSide;