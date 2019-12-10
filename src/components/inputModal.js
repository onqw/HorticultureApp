import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const customStyles = {
    content: {
      top:'33%',
      left:'50%',
      right:'auto',
      bottom:'auto',
      marginRight:'-50%',
      transform:'translate(-50%, -50%)',
      minHeight:'33%',
      minWidth:'50%',
      maxWidth:'75%'
    }
  };


Modal.setAppElement('div')

class inputModal extends React.Component {
  constructor() {
    super();
    
  this.state = {
      modalIsOpen: false
  };
  
  this.openModal = this.openModal.bind(this);
  this.afterOpenModal = this.afterOpenModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  }
  pad={padding:'10px'}
  openModal() {
  this.setState({modalIsOpen: true});
  }
  
  afterOpenModal() {
  // references are now sync'd and can be accessed.
  this.subtitle.style.color = 'Green';
  }
  
  closeModal() {
  this.setState({modalIsOpen: false});
  }
  
  render() {
  return (
    <div>
      <Button onClick={this.openModal}>New Sighting</Button>
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="New Sighting"
      >
      <Row>
        <Col xs={1}/>
        <Col xs={10}>
          <Row ref={subtitle => this.subtitle = subtitle}>
            <Col xs={10} style={{textAlign:'center'}}>Input answers below</Col>
            <Col xs={2}>
              <Button variant='danger' onClick={this.closeModal}>
                close
              </Button>
            </Col>
          </Row>
          <Row id='Modal-body'>
            <form>
              <Row style={this.pad}>
                <Col xs={5}>Select Flower:</Col> 
                <Col xs={7}><input /></Col>
              </Row>
              <Row style={this.pad}>
                <Col xs={5}>First name:</Col> 
                <Col xs={7}><input /></Col>
              </Row>
              <Row style={this.pad}>
                <Col xs={5}>Location:</Col> 
                <Col xs={7}><input /></Col>
              </Row>
              <Row style={this.pad}>
                <Col xs={5}>Date Sighted:</Col> 
                <Col xs={7}><input /></Col>
              </Row>

            </form>
          </Row> 
        </Col>
        <Col xs={1}/>
      </Row>
      </Modal>
    </div>
    );
  }
}
export default inputModal;