var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'antares',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.post('/', function(req, res){
  var todolist = req.body;
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        var queryText = 'INSERT INTO "todolist" ("task", "priority")' +
                        ' VALUES ($1, $2);';
        db.query(queryText, [todolist.task, todolist.priority], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        }); // end query
      } // end if
    }) // end pool
}); //end of post/insert


router.get('/', function(req, res){

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to the database.');
      res.senStatus(500);
    }else{
      var queryText = 'SELECT * FROM "todolist";';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        }else{
          res.send({todolist: result.rows});
        }
      }); //end query
    } //end if
  }) //end of pool
});//end of GET

router.delete('/:id', function(req, res){
var id = req.params.id;

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to the database.');
      res.senStatus(500);
    }else{
      var queryText = 'DELETE FROM "todolist" WHERE "id" = $1;';
      db.query(queryText, [id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        }else{
          res.sendStatus(200);
        }
      }); //end query
    } //end if
  }) //end of pool
});
module.exports = router;
