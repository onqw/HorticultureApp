import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modalin from './components/inputModal.js';
import Header from './Header';
import Scrollbars from 'react-custom-scrollbars';
import Modalin2 from './components/inputModal2.js';
var bg=require('./flower.jpg');
var loginBG=require('./loginBG.jpg');
var flowerPic;
class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      status:'',
      name:'',
      userList: [],
      flowers: [],
      tenRecent: [],
      selected: {'flower':'','latin':''},
      resultGoogle:''
      
    }

  }

  separate = {padding:'5px',
    borderBottom:'1px solid black'}

  boldCenter = {textAlign:'center', 
  fontWeight:'bold', padding:'10px'}

  center = {textAlign:'center'}

  rowBorder = {
    border:'8px solid #000000',
    color: "white",
    fontFamily: 'Times New Roman',
    backgroundColor:"black",
    borderRadius:'3px',
    borderColor: 'grey'
  }

  // scrollAble = {height:(3*window.innerHeight/4),
  //   overflow:'hidden',overflowY:'scroll',
  //   scrollbarWidth: 'thin',
  //   // backgroundColor:'rgba(0, 0, 0, 0.8)',
  //   scrollBehavior:'smooth',
    
  //   }

  lists10 = {minHeight:(1.0*window.innerHeight/4)
    }

  render10 = {textAlign:'center',
  //  borderBottom:'3px solid lightgrey',
   borderTop:'3px solid lightgrey',
    color: 'white', fontSize:'1.1rem', fontFamily: 'Times New Roman'}
  componentDidMount(){
    this.getFlower();
    this.getUsers();
  }
  getFlower = _ =>{
      fetch('http://localhost:4000/showAllFlowers')
      .then(response => response.json())
      .then(response => this.setState({flowers: response.data}))
      .catch(err => console.error(err))
  }

  getUsers = _ => {
    fetch('http://localhost:4000/getUsers')
      .then(response => response.json())
      .then(response => this.setState({userList: response.data}))
      .catch(err => console.error(err))
  }

  searchFlower = (comname,latin) =>{
    try {
      flowerPic=require('./images/'+latin+'/1.jpg')
    }
    catch(err){
      try {
        flowerPic=require('./images/'+latin+'/1.JPG')
      }
      catch(err){
        flowerPic=require('./images/noData/1.jpg')
        console.error(err);
      }
    }
    
    console.log(flowerPic)
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
      this.setState({selected: {'flower':COMNAME,'latin':GENUS+' '+SPECIES}})
      //console.log(this.selected)
      this.searchFlower(COMNAME,GENUS+' '+SPECIES)
    }}> 
    <Row style={{fontSize:'1.1rem', fontFamily: 'Times New Roman'}}>
        <Col xs={6} >{GENUS + " " + SPECIES}</Col>
        <Col xs={6}>{COMNAME}</Col>
    </Row>
  </Button>
  
  )
  
  render10Recent= ({NAME, PERSON, LOCATION, SIGHTED}) => (
      <Row style={{background:'rgb(0,0,0,0.4)'}}>
          <Col xs={3} style={this.render10}>{PERSON}</Col>
          <Col xs={5} style={this.render10}>{LOCATION}</Col>
          <Col xs={4} style={this.render10}>{SIGHTED}</Col>
      </Row>
    
    )

  renderFlowerNames = ({GENUS, SPECIES, COMNAME}) => {
      return {'latin':GENUS + ' ' + SPECIES,'comname':COMNAME}}  
 
  handleChange = ({target}) => {this.setState({[target.name]:target.value})}
  logInUser = () => {
    if(this.state.userList !== undefined){
      console.log('trying to log in: '+ this.state.name)
      if(this.state.userList.find((element) => element.NAME === this.state.name)){
        this.setState({status:'Success, Logging in'})
        setTimeout(()=>this.setState({loggedIn:true}),1500)
      }
      else{
        //show error
        this.setState({status:'Failed to Login'})
      }
    }
    else {
      //trigger error
      console.error('Could not log in: ' + this.state.userList)
    }
  
  }
  logInGuest = () => {
    this.setState({name:'guest'})
    setTimeout(() => {this.setState({loggedIn:true})},1500);
  }

  render(){
    if (this.state.loggedIn){
      const { flowers, selected, tenRecent } =this.state;
      return (

        <div className = "App" 
        style={{padding:'1px',backgroundColor: '#31302F', 
        height: '100vh', backgroundImage: "url("+bg+")",
        overflow:'hidden' }}>
          <Header />
          <p></p>
          {/* <img src= "/flower.jpg" /> */}
          <Row>
            <Col xs={1}/>
            <Col xs={10}>
              <Row>
                <Col xs={6} style={{backgroundColor:'#1e1e2f',
                  borderRadius:'1rem'}}>
                  <Row>
                  <Col lg={6} style={{fontWeight:'bold', 
                  paddingLeft:'25px', fontSize:'1.4rem', 
                  color: 'white', fontFamily: 'Times New Roman'}}>
                    Selected Flower:</Col>
                  <Col lg={6} style={{
                  color: 'white', fontSize:'1.40rem',
                  minHeight:'2rem', fontFamily:'Times New Roman'}}>{selected.flower}</Col>
                  </Row>
                </Col>
                <Col xs={3} style={{textAlign:'center',
                  margin:'auto',
                  width:'100%', height:'100%'}}>
                 <Modalin2
                    passName={this.state.name}
                    passSelected={this.state.selected.flower}
                    flowerNames={flowers.map(this.renderFlowerNames)}
                  />
                </Col>
                <Col xs={3} style={{textAlign:'center',
                     margin:'auto',
                     width:'100%', height:'100%'}}>
                  <Modalin
                    passName={this.state.name}
                    passSelected={this.state.selected.flower}
                    flowerNames={flowers.map(this.renderFlowerNames)}
                  />
                </Col>
                
              </Row>
              <Row>
                <Col xs={6}>
                  <Row style = {this.boldCenter}>
                    <Col xs={6} style={{color: 'white', fontSize: '20px', 
                    fontFamily:'Times New Roman', fontWeight: 'bold', backgroundColor:'#1e1e2f',
                    borderRadius:'1rem'}}>Latin Name</Col>
                    <Col xs={6} style={{color: 'white', fontSize: '20px',
                    fontFamily:'Times New Roman', fontWeight: 'bold', backgroundColor:'#1e1e2f',
                    borderRadius:'1rem'}}>Common Name</Col>
                  </Row>
                </Col>
                <Col xs={6}>
                  <Row style={this.boldCenter}>
                    <Col style={{color: 'white', fontSize: '20px',  
                    fontFamily:'Times New Roman', fontWeight: 'bold', backgroundColor:'#1e1e2f',
                    borderRadius:'1rem'}} xs={3}>Person</Col>
                    <Col style={{color: 'white', fontSize: '20px', 
                    fontFamily:'Times New Roman', fontWeight: 'bold', backgroundColor:'#1e1e2f',
                    borderRadius:'1rem'}} xs={5}>Location</Col>
                    <Col style={{color: 'white', fontSize: '20px', 
                    fontFamily:'Times New Roman', fontWeight: 'bold', backgroundColor:'#1e1e2f',
                    borderRadius:'1rem'}} xs={4}>Date Sighted</Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Scrollbars 
                   style={{ width:'100%', height:'100%' }}>
                    {flowers.map(this.renderFlower)}
                  </Scrollbars>
                </Col>
                <Col xs={6} style={this.lists10}>
                  <div style={{width:'100%',height:'100%',
                  // background: "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))",
                  // backgroundImage:"url("+flowerPic+")",
                  backgroundSize:'cover'}}>
                    {tenRecent.map(this.render10Recent)}
                  </div>
                  <p style={{color: 'red', backgroundColor: 'black', opacity: '0.8', fontSize: '20px'}}>Scroll up and down to view the list of flowers available in the database. 
                  Click on a flower in the table to the left.
                  The table on the right displays the 10 most recent sightings of a flower. 
                  Click on the 'Edit Flower' button the change the genus, species and common name of the flowers.
                  Click on the 'New Sighting' button to insert a new sighting of a flower into the database.
                    
                  </p>
                </Col>
                
              </Row>
              <Col xs={6}>
              <img width='700px' height='500px' src={flowerPic}/>
                
                </Col>
            </Col>
            <Col xs={1}/>
          </Row>
        </div>
      
      );
      
    }
    else {
      const largeStyle = {textAlign:'center', 
      fontWeight:'bold', color:'white',
      fontSize:'1.75rem', fontFamily: 'Times New Roman', opacity: '0.8'}
      var depends = () => {
        if (this.state.status !== 'Success, Logging in'){
          return 'red'
        }
        else {
          return 'lightgreen'
        }
      }
      return(
        <div className = "App" 
        style={{padding:'1px',backgroundColor: '#31302F', 
        height: '100vh', backgroundImage: "url("+loginBG+")", 
        backgroundSize:'cover', overflow:'hidden'}}>
          <Header />
          <Row style={{minHeight:'15rem'}}/>
          <Col xs={12}>
            <Row >
              <Col xs={3}/>
              <Col md={6}>
                <Row >
                  <Col style={largeStyle}>
                    <p></p>
                    <p>Sign In with your First Name</p> 
                  </Col>
                </Row>
                <Row>
                  <Col style={this.center}>
                  <input name='name' value={this.state.name} title="First Name" 
                  style={{width:'50%',
                  borderRadius:'1rem'}}
                  onChange={this.handleChange}/>
                  </Col>
                </Row>
                <Row>
                  <Col style={{textAlign:'center',
                    color:depends(), fontWeight:'bold',
                    backgroundColor:'rgb(0,0,0,0.1)',
                    maxWidth:'50%', margin:'auto'}}>
                    {this.state.status}
                  </Col>
                </Row>
                <Row>
                  <Col style={this.center}>
                    <Button onClick={this.logInUser} style={{width:'50%', borderRadius: '1rem', 
                    fontFamily: 'Times New Roman', backgroundColor: '#1e1e2f', borderColor: '#1e1e2f'}}
                    >Sign In</Button>
                  </Col>
                  
                </Row>
                <Row>
                  <Col style={largeStyle}>
                    <p>or</p>
                    
                  </Col>
                </Row>
                <Row>
                  <Col style={{textAlign:'center', 
      fontWeight:'bold', color:'white',
      textDecoration:'underline',
      fontSize:'2.0rem', fontFamily: 'Times New Roman'}}>
                    <Button onClick={this.logInGuest} style={{width:'50%', borderRadius: '1rem', backgroundColor: '#1e1e2f', borderColor: '#1e1e2f'}}
                    >Continue As Guest</Button>
                  </Col>
                </Row>
              </Col>
              <Col xs={3}/>
            </Row>
          </Col>
          
        </div>
      )
    }
  }
}
export default App;
