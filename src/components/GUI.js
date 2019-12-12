import React from 'react';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-date-picker';
import Select from "react-dropdown-select";
import axios from 'axios';
import moment from 'moment';

class inputModal extends React.Component {
  constructor(props) {
    super(props);
    
  this.state = {
  }

};
  render() {
    return (
      <div>
        <Row>
          <Col><h2>Edit Tables</h2></Col>
        </Row>
        <Row>
          <Col>
            <Button></Button>
          </Col>
          
        </Row>
        
      </div>
    )
  }
}