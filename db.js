const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();


const app = express();



app.use(cors());

let db = new sqlite3.Database('flowers2019.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQlite database.');
});

app.get('/',(req,res) =>{
	let printALL = 'SELECT * FROM SIGHTINGS';
	db.all(printALL, (err,rows)=>{
	if (err) {
    throw err;
  }
    return res.json({
    	data: rows
    }
    	)
 
	});
});

app.get('/findFlower',(req,res) =>{
	
	//console.log("test");
	const {flower, name} = req.query;
	//console.log(req.query);
	console.log("Finding:" + flower);
	let searchFor10ByName =
		'SELECT * FROM SIGHTINGS ' + 
		'WHERE SIGHTINGS.name = "' + flower + '"' +
		' ORDER BY SIGHTED DESC Limit 10';
	db.all(searchFor10ByName, (err,row)=>{
		//console.log(searchFor10ByName);
	  if (err) {
	    return res.send(err);
	  }
	  
    return res.json({data: row});
	});
});



app.get('/showAllFlowers',(req,res) =>{

	let showAllSightingsQuery = 'SELECT DISTINCT *'
	+ ' FROM FLOWERS ORDER BY GENUS ASC';
	db.all(showAllSightingsQuery, (err,row)=>{
	  if (err) {
	    return res.send(err);
	  }
	  //console.log(row);
    return res.json({data: row});
	});
});





/*db.all(showAllSightingsQuery, [], (err,rows)=>{
	if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});*/

/*db.all(printALl, [], (err,rows)=>{
	if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});*/

let conname = "Ithuriels spear";

/*db.each(searchFor10ByName, [conname], (err,row)=>{

  if (err) {
    return console.error(err.message);
  }
  console.log(row);
});
*/

//let insertNewRow = 'INSERT INTO SIGHTINGS(NAME,PERSON,LOCATION,SIGHTED) VALUES("FLowerA","Gus","Place", DATE('now'))';



/*db.run(insertNewRow, (err) =>{
		if(err) {
		return console.log(err); 
	}
	 console.log(`Rows inserted ${this.changes}`);
	}); */



app.listen(4000, () =>{
	console.log('listening on port 4000'); 
});