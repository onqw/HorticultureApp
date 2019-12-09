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

  searchFlower = _ =>{
    fetch('http://localhost:4000/findFlower?flower=' + encodeURIComponent(this.selected.flower))
      .then(response => response.json())
      .then(response => (this.setState({tenRecent: response.data}),
        console.log(response.data)))
      .catch(err => console.error(err))
    //correctly sets tenRecent
  }


  rowBorder = {
    border:'1px solid #000000',
    color:"Blue",
    backgroundColor:"white",
  }
  renderFlower= ({GENUS, SPECIES, COMNAME}) => (
  <Button key={COMNAME} style={this.rowBorder} block
    onClick={e => (
      console.log('COMNAME Selected: ' + COMNAME),
      this.setState(this.selected = {'flower':COMNAME,'name':''}),
      console.log(this.selected),
      this.searchFlower()
  )}> 
    <Row>
        <Col xs={6} >{GENUS + " " + SPECIES}</Col>
        <Col xs={6}>{COMNAME}</Col>
    </Row>
  </Button>
  
  )
  
 
  render(){
    
    const { flowers, selected, tenRecent } =this.state;
    return (
      <div className = "App" style={{padding:'10px',fontSize:'1rem'}}>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={4} style={{textAlign:'center', fontWeight:'bold'}}>Latin name</Col>
              <Col xs={4} style={{textAlign:'center', fontWeight:'bold'}}>Comname</Col>
              <Col xs={4} style={{textAlign:'center', fontWeight:'bold'}}>Flower Selected</Col>
            </Row>
            <Row>
              <Col xs={8}>
                {flowers.map(this.renderFlower)}
              </Col>
              <Col xs={4}>
                Common Name: {selected.flower /* Does not update*/} 
                {/*tenRecent.map(this.render10Recent)*/}
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
