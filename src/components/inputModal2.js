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


const customStyles = {
    content: {
      top:'33%',
      left:'50%',
      right:'auto',
      bottom:'auto',
      marginRight:'-50%',
      transform:'translate(-50%, -50%)',
      minHeight:'40%',
      minWidth:'50%',
      maxWidth:'400px'
    }
  };

Modal.setAppElement('div')

class inputModal extends React.Component {
  constructor(props) {
    super(props);
    
  this.state = {
      modalIsOpen: false,
      selected:[],
      Species:'',
      Genus:'',
      Comname:''
  };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  pad={paddingTop:'5px',paddingBottom:'5px'}
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

  onDateChange = date => {this.setState({ date })}
  onChangeHandle = ({target}) => {this.setState({[target.name]:target.value})}
  
  setSelected = (select) => {
    this.setState({'selected':select})
  }

  itemRenderer = ({ item, itemIndex, props, state, methods }) => (
    <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
      <div style={{ margin: "10px" }}>
        <input type="checkbox" checked={methods.isSelected(item)} />
        &nbsp;&nbsp;&nbsp;{item[props.labelField]}
      </div>
    </div>
  );

  updateFlower = () => {
    if (this.selected === []){
      return
    }
    else{
      let old = this.state.selected[0].comname
      let Genus = this.state.Genus
      let Species = this.state.Species
      let Comname = this.state.Comname
      //let oldcomname
      axios({
        method:'post',
        url:'http://localhost:4000/updateFlower',
        data:{
          "genus": Genus,
          "species":Species,
          "comname":Comname,
          "old": old,
          //"date":date
        }}).then(res=>{console.log(res.status)})
        .catch(err => console.error(err))
    }
  }
  render() {
  return (
    <div>
      <Button onClick={this.openModal}>Edit Flower</Button>
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit Flower"
      >
      <Row>
        <Col xs={1}/>
        <Col xs={10}>
          <Row ref={subtitle => this.subtitle = subtitle}>
            <Col md={10} style={{fontWeight:'bold', fontSize:'1.5rem'}}>Input answers below</Col>
            <Col md={2}>
              <Button variant='danger' onClick={this.closeModal}>
                close
              </Button>
            </Col>
          </Row>
          <Row id='Modal-body'>
            <Col md={12}>
              <form>
                <Row style={this.pad}>
                  <Col xs={4}>Flower:</Col> 
                  <Col lg={8}>
                  <Select 
                  labelField='comname'
                  valueField='comname'
                  sortBy='comname'
                  searchBy='comname'
                  multi={false}
                  dropdownHeight='200px'
                  dropdownGap={5}
                  disabled={false}
                  name='selected'
                  options={this.props.flowerNames} 
                  value={this.state.selected}
                  onChange={(selected) => {this.setSelected(selected)
                    console.log(selected)}}
                    
                  />
                    
                  </Col>
                </Row>
                <Row style={this.pad}>
                  <Col xs={4}>Genus:</Col> 
                  <Col xs={8}><input type='text' name='Genus' value={this.state.Genus} onChange={this.onChangeHandle}/></Col>
                </Row>
                <Row style={this.pad}>
                  <Col xs={4}>Species:</Col> 
                  <Col xs={8}><input type='text' name='Species' value={this.state.Species} onChange={this.onChangeHandle}/></Col>
                </Row>
                <Row style={this.pad}>
                  <Col xs={4}>Comname:</Col> 
                  <Col xs={8}><input type='text' name='Comname' value={this.state.Comname} onChange={this.onChangeHandle}/></Col>
                </Row>
                <Button onClick={this.updateFlower}>Submit</Button>
              </form>
            </Col>
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