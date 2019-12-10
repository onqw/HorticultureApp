import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      flowers: [],
      selected: {'flower':'','name':'someone'},
      tenRecent: []
    }
  }

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

  boldCenter = {textAlign:'center', fontWeight:'bold'}
  rowBorder = {
    border:'1px solid #000000',
    color:"Blue",
    backgroundColor:"white",
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

  separate = {padding:'5px',
  borderBottom:'1px solid black'}

  render10Recent= ({NAME, PERSON, LOCATION, SIGHTED}) => (
      <Row>
          <Col xs={3} style={this.separate}>{PERSON}</Col>
          <Col xs={5} style={this.separate}>{LOCATION}</Col>
          <Col xs={4} style={{padding:'5px', borderBottom:'1px solid black'}}>{SIGHTED}</Col>
      </Row>
    
    )
  scrollAble = {height:(2*window.innerHeight/3 - 20),
  overflow:'hidden',overflowY:'scroll',
  borderTop:'1px solid black',
  borderBottom:'1px solid black',
  borderRight:'1px solid black'}

  lists10 = {height:(2*window.innerHeight/3 - 20),
    borderTop:'1px solid black',
    borderBottom:'1px solid black',
    borderRight:'1px solid black',}
 
  render(){
    
    const { flowers, selected, tenRecent } =this.state;
    return (
      <div className = "App" style={{padding:'10px',fontSize:'1rem'}}>
        <Row>
          <Col xs={12}>
            <Row>
              <div style={{fontWeight:'bold', padding:'1rem'}}>
                Currently Selected Flower: {selected.flower /* Does not update*/}
              </div>
            </Row>
            <Row>
              <Col xs={4}>
                <Row>
                  <Col xs={6} style={this.boldCenter}>Latin name</Col>
                  <Col xs={6} style={this.boldCenter}>Comname</Col>
                </Row>
              </Col>
              <Col xs={4}>
                <Row style={{fontWeight:'bold', textAlign:'center'}}>
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
{/* <Row>
          <Col>
            <input style={{borderWidth:"2px", borderColor:"#000000", color:"Blue" }}
            value = {flowers.NAME}
            onChange = {e => this.setState({flowers: {...flowers, NAME: e.target.value }})}
            />
          </Col>
        </Row> */}
export default App;
