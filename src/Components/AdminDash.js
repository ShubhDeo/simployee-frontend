import React, { useState } from 'react';
import AdminLogo from './AdminLogo'
import {Button, Alert, Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const AdminDash = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
          <Row className="">

    <Col><div className='Left'>

        <h1 style={{marginLeft:"5%", marginTop:"4%", textAlign:'left'}}>Admin Dashboard</h1>
        
        <div className='d-flex'>
        <h4 style={{marginLeft:"5%", marginTop:"10%", textAlign:'left'}}>Employees</h4>
        
        <>
      <Button style={{marginLeft:"10%", marginTop:"10%", textAlign:'left'}} variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        </div>







    </div></Col>











   <Col> <div className="Right" style={{marginLeft:"5%", marginTop:"20%", textAlign:'left'}}>
        <AdminLogo/>

    </div> </Col>


    </Row>
    </div>
  )
}

export default AdminDash