import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modalin from './components/inputModal.js';

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
    border:'1px solid #000000',
    color:"Blue",
    backgroundColor:"white"}

  scrollAble = {height:(1.5*window.innerHeight/3),
    overflow:'hidden',overflowY:'scroll',
    borderTop:'1px solid black',
    borderBottom:'1px solid black',
    borderRight:'1px solid black'}

  lists10 = {minHeight:(1.5*window.innerHeight/3),
    borderTop:'1px solid black',
    borderBottom:'1px solid black',
    borderRight:'1px solid black'}

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
      .then(response => (this.setState({tenRecent: response.data}),
        console.log(response.data)))
      .catch(err => console.error(err))
    //correctly sets tenRecent
  }

  
  renderFlower= ({GENUS, SPECIES, COMNAME}) => (
  <Button key={COMNAME} style={this.rowBorder} block
    onClick={e => (
      console.log('COMNAME Selected: ' + COMNAME),
      this.setState({selected: {'flower':COMNAME,'name':''}}),
      console.log(this.selected),
      this.searchFlower(COMNAME)
  )}> 
    <Row>
        <Col xs={6} >{GENUS + " " + SPECIES}</Col>
        <Col xs={6}>{COMNAME}</Col>
    </Row>
  </Button>
  
  )

  

  render10Recent= ({NAME, PERSON, LOCATION, SIGHTED}) => (
      <Row>
          <Col xs={3} style={this.separate}>{PERSON}</Col>
          <Col xs={5} style={this.separate}>{LOCATION}</Col>
          <Col xs={4} style={{padding:'5px', borderBottom:'1px solid black'}}>{SIGHTED}</Col>
      </Row>
    
    )

  
 

  render(){
    
    const { flowers, selected, tenRecent } =this.state;
    return (
      <div className = "App" style={{padding:'10px',fontSize:'1rem'}}>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={4} >
                <Row style={{fontWeight:'bold', paddingLeft:'20px'}}>Currently Selected Flower:</Row>
                 <Row style={{paddingLeft:'20px',minHeight:'2rem'}}>{selected.flower}</Row>
              </Col>
              <Col xs={2} style={this.center}>
                <Button>Edit Flower</Button>
              </Col>
              <Col xs={2} style={this.center}>
                <Modalin/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Row>
                  <Col xs={6} style={this.boldCenter}>Latin name</Col>
                  <Col xs={6} style={this.boldCenter}>Comname</Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row style={this.boldCenter}>
                  <Col xs={3}>Person</Col>
                  <Col xs={5}>Location</Col>
                  <Col xs={4}>Date Sighted</Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col xs={4} style={this.scrollAble}>
                {flowers.map(this.renderFlower)}
              </Col>
              <Col xs={4} style={this.lists10}>
                {tenRecent.map(this.render10Recent)}
              </Col>
            </Row>
          </Col>
         
        </Row>
        
      </div>
    );
    
  }
}
export default App;
