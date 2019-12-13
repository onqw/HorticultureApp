import React from 'react';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from "react-dropdown-select";
import axios from 'axios';


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
      maxWidth:'400px',
      backgroundColor:'rgb(249,224,229,1)',
      borderRadius:'2rem',
      color:'black',
      fontWeight:'bold'
    }
  };

  const lightGrey = {color:'black',backgroundColor:'white'}

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
      <Button onClick={this.openModal}
      style={{color: 'white', fontFamily: 'Times New Roman',
      backgroundColor: '#1e1e2f', 
      fontWeight: 'bold', 
      borderColor: '#1e1e2f'}}>
        Edit Flower</Button>
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
            <Col md={10} style={{color:'black',fontWeight:'bold', fontSize:'1.5rem'}}>
              Input answers below</Col>
            <Col md={2}>
              <Button style={{paddingTop:'0rem', 
              paddingBottom:'0rem',
              paddingLeft:'0.5rem',
              paddingRight:'0.5rem',
              margin:'auto',
              fontWeight:'bold'}}
              variant='danger' onClick={this.closeModal}>
                x
              </Button>
            </Col>
          </Row>
          <Row id='Modal-body'>
            <Col md={12}>
              <form>
                <Row style={this.pad}>
                  <Col xs={4}>Flower:</Col> 
                  <Col lg={8}>
                  <Select style={lightGrey}
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
                <Row style={{minHeight:'1rem'}}/>
                <Row style={this.pad}>
                  <Col xs={4}>Genus:</Col> 
                  <Col xs={1}></Col>
                  <Col xs={7}><input 
                    style={lightGrey,
                    {minWidth:'100%'}}
                   type='text' name='Genus'
                   value={this.state.Genus}
                   onChange={this.onChangeHandle}/></Col>
                </Row>
                <Row style={{minHeight:'1rem'}}/>
                <Row style={this.pad}>
                  <Col xs={4}>Species:</Col> 
                  <Col xs={1}></Col>
                  <Col xs={7}><input style={lightGrey,
                    {minWidth:'100%'}}
                    type='text'
                    name='Species' 
                    value={this.state.Species}
                    onChange={this.onChangeHandle}/></Col>
                </Row>
                <Row style={{minHeight:'1rem'}}/>
                <Row style={this.pad}>
                  <Col xs={5}>Common Name:</Col> 
                  <Col xs={7}><input style={lightGrey,
                    {minWidth:'100%'}}
                    type='text' name='Comname'
                    value={this.state.Comname}
                    onChange={this.onChangeHandle}/></Col>
                </Row>
                <Button style={{color:'black',fontWeight:'bold',
                backgroundColor:'rgba(255, 50, 100, 0.65)',
                outlineActive:'solid 1px rgba(255, 50, 100, 0.4)'}}
                onClick={this.updateFlower}
                variant='danger'>Submit</Button>
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