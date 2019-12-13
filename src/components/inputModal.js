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
      minHeight:'30%',
      minWidth:'30%',
      maxWidth:'400px',
      backgroundColor: '#737277',
      borderRadius:'1rem',
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
      date: new Date(),
      selected:[],
      name:'',
      location:'',
      insertStatus:''
  };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  pad={paddingTop:'5px',paddingBottom:'5px'}
  openModal() {
  this.setState({modalIsOpen: true});
  if (this.props.passName !== ''){
    this.setState({name:this.props.passName})
  }
  }
  
  afterOpenModal() {
  // references are now sync'd and can be accessed.
  this.subtitle.style.color = 'white';
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

  insertTuple = () => {
    if (this.state.selected === []){
      this.setState({insertStatus:'Please enter a flower'})
      return
    }
    else{
      if (this.state.selected[0] !== undefined) {
        let flower = this.state.selected[0].comname
        let person = this.state.name
        let location = this.state.location
        let date = moment(this.state.date)
          .format('YYYY-MM-DD')
        axios({
          method:'post',
          url:'http://localhost:4000/insertSighting',
          data:{
            "flower":flower,
            "person":person,
            "location":location,
            "date":date
          }}).then(res=>{
            if (res.status===200){
              this.setState({insertStatus:'Success'})
              setTimeout(()=>{this.closeModal()},2000)
            }
            else {
              this.setState({insertStatus:'Failed to insert'})
            }
          })
          .catch(err => console.error(err))
      }
      else {
        this.setState({insertStatus:'Please enter a flower'})
      }
      
    }
  }
  render() {
    const depends = () => {
      if (this.state.insertStatus !== 'Success'){
        return 'red'
      }
      else {
        return 'lightgreen'
      }
    }
  return (
    
    <div>
      <Button onClick={this.openModal}
        style={{color: 'white', fontFamily: 'Times New Roman',
        backgroundColor: '#1e1e2f', 
        fontWeight: 'bold', 
        borderColor: '#1e1e2f'}}>New Sighting</Button>
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="New Sighting"
      >
      <Row>
        <Col xs={1}/>
        <Col style={{height: '100%'}}>
          <Row ref={subtitle => this.subtitle = subtitle}>
            <Col md={10} style={{color:'black',
            fontWeight:'bold', fontSize:'1.5rem', color: 'white',fontFamily: 'Times New Roman'}}>
              Your New Sighting</Col>
            <Col md={2} style={{textAlign:'right'}}>
              <Button variant='danger' 
              style={{paddingTop:'0rem', 
              paddingBottom:'0rem',
              paddingLeft:'0.5rem',
              paddingRight:'0.5rem',
              margin:'auto',
              fontWeight:'bold'}} onClick={this.closeModal}>
                
              </Button>
            </Col>
          </Row>
          <Row id='Modal-body'>
            <Col md={12}>
              <form >
                <Row style={this.pad}>
                  <Col xs={4} style={{fontFamily: 'Times New Roman', color: 'white'}}>Flower:</Col> 
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
                  <Col xs={4} style={{fontFamily: 'Times New Roman', color: 'white'}}>First name:</Col> 
                  <Col xs={1}></Col>
                  <Col xs={7}>
                    <input style={lightGrey,
                      {minWidth:'100%'}}
                      type='text' name='name'
                      value={this.state.name}
                      onChange={this.onChangeHandle}/>
                    </Col>
                </Row>
                <Row style={{minHeight:'1rem'}}/>
                <Row style={this.pad}>
                  <Col xs={4} style={{fontFamily: 'Times New Roman', color: 'white'}}>Location:</Col> 
                  <Col xs={1}></Col>
                  <Col xs={7}>
                    <input style={lightGrey,
                    {minWidth:'100%'}} type='text' 
                    name='location' 
                    value={this.state.location} 
                    onChange={this.onChangeHandle}/>
                  </Col>
                </Row>
                <Row style={{minHeight:'1rem'}}/>
                <Row style={this.pad}>
                  <Col xs={5} style={{fontFamily: 'Times New Roman', color: 'white'}}>Sighted on:</Col> 
                  <Col xs={7}>
                    <div style={lightGrey,
                      {minWidth:'100%'}}>
                    <DatePicker
                      style={{color: 'white', backgroundColor: 'black'}}
                      onChange={this.onDateChange}
                      value={this.state.date}
                      format='y-MM-dd'
                    />
                    </div>
                  </Col>
                </Row>
                <div style={{color:depends(), fontWeight:'bold',
                    backgroundColor:'rgb(0,0,0,0.2)',
                    width:'auto'}}>
                  {this.state.insertStatus}
                </div>
                <Button onClick={this.insertTuple}
                style={{color:'white',fontWeight:'bold',
                backgroundColor:'black',
                outlineActive:'solid 1px rgba(255, 50, 100, 0.4)', fontFamily: 'Times New Roman'}}
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