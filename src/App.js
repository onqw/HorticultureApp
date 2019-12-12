import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modalin from './components/inputModal.js';
import Header from './Header';
var bg=require('./flower.jpg');
class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      flowers: [],
      selected: {'flower':'','name':''},
      tenRecent: []
    }
  }

  separate = {padding:'5px',
    borderBottom:'1px solid black'}

  boldCenter = {textAlign:'center', fontWeight:'bold'}

  center = {textAlign:'center'}

  rowBorder = {
    border:'8px solid #000000',
    color: "white",
    backgroundColor:"black"}

  scrollAble = {height:(2.5*window.innerHeight/4),
    overflow:'hidden',overflowY:'scroll',
    backgroundColor:'black',
    scrollbarWidth: 'thin',
    direction: 'rtl',
    opacity:'0.5',
    }

  lists10 = {minHeight:(1.5*window.innerHeight/3),
    backgroundColor:'black',
    opacity:'0.3',}

  componentDidMount(){
    this.getFlower();

  }
  getFlower = _ =>{
      fetch('http://localhost:4000/showAllFlowers')
      .then(response => response.json())
      .then(response => this.setState({flowers: response.data}))
      .catch(err => console.error(err))
  }

  searchFlower = (comname) =>{
    fetch('http://localhost:4000/findFlower?flower=' + encodeURIComponent(comname))
      .then(response => response.json())
      .then(response => (this.setState({tenRecent: response.data})))
        //console.log(response.data)))
      .catch(err => console.error(err))
    //correctly sets tenRecent
  }


  renderFlower= ({GENUS, SPECIES, COMNAME}) => (
  <Button key={COMNAME} style={this.rowBorder} block
    onClick={e => {
      console.log('COMNAME Selected: ' + COMNAME)
      this.setState({selected: {'flower':COMNAME,'name':''}})
      console.log(this.selected)
      this.searchFlower(COMNAME)
    }}> 
    <Row>
        <Col xs={6} >{GENUS + " " + SPECIES}</Col>
        <Col xs={6}>{COMNAME}</Col>
    </Row>
  </Button>
  
  )

  render10Recent= ({NAME, PERSON, LOCATION, SIGHTED}) => (
      <Row>
          <Col xs={3} style={{padding:'5px', borderBottom:'5px solid white', color: 'white'}}>{PERSON}</Col>
          <Col xs={5} style={{padding:'5px', borderBottom:'5px solid white', color: 'white'}}>{LOCATION}</Col>
          <Col xs={4} style={{padding:'5px', borderBottom:'5px solid white', color: 'white'}}>{SIGHTED}</Col>
      </Row>
    
    )

  renderFlowerNames = ({GENUS, SPECIES, COMNAME}) => {
      return {'latin':GENUS + ' ' + SPECIES,'comname':COMNAME}}  
 

  render(){
    
    const { flowers, selected, tenRecent } =this.state;
    return (

      <div className = "App" style={{padding:'1px',backgroundColor: '#31302F', height: '100vh', backgroundImage: "url("+bg+")" }}>
        <Header />
        {/* <img src= "/flower.jpg" /> */}
        <Row>
          <Col xs={1}/>
          <Col xs={10}>
            <Row>
              <Col xs={6} >
                <Row style={{fontWeight:'bold', paddingLeft:'20px', fontSize:'25px', color: 'grey', paddingBottom:'10px'}}>Currently Selected Flower:</Row>
                 <Row style={{paddingLeft:'20px', color: 'white', fontSize:'23px'}}>{selected.flower}</Row>
              </Col>
              <Col xs={3} style={this.center}>
                <Button style={{color: 'black', backgroundColor: '#FAC363', fontWeight: 'bold', borderColor: '#DF9107'}}>Edit Flower</Button>
              </Col>
              <Col xs={3} style={this.center}>
                <Modalin
                  flowerNames={flowers.map(this.renderFlowerNames)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Row style = {this.boldCenter}>
                  <Col xs={6} style={{color: 'white', fontSize: '20px', opacity: '0.6'}}>Latin name</Col>
                  <Col xs={6} style={{color: 'white', fontSize: '20px', opacity: '0.6'}}>Comname</Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Row style={this.boldCenter}>
                  <Col style={{color: 'white', fontSize: '20px', opacity: '0.6'}} xs={3}>Person</Col>
                  <Col style={{color: 'white', fontSize: '20px', opacity: '0.6'}} xs={5}>Location</Col>
                  <Col style={{color: 'white', fontSize: '20px', opacity: '0.6'}} xs={4}>Date Sighted</Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col xs={6} style={this.scrollAble}>
                {flowers.map(this.renderFlower)}
              </Col>
              <Col xs={6} style={this.lists10}>
                {tenRecent.map(this.render10Recent)}
              </Col>
            </Row>
          </Col>
          <Col xs={1}/>
        </Row>
      </div>
     
    );
    
  }
}
export default App;
