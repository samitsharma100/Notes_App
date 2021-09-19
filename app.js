const express = require('express');
let _ = require('lodash');
const notes = require('./db/notes')
const schema = require('./schema/validateNote')
let Validator = require('jsonschema').Validator;
let noteList = require('./notes')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/api/v1/notes', async (request, response) => {
  try {
    const search = request.query.search ? request.query.search : null;    
    let results = noteList
    if (search) {
      results = _.filter(noteList,function(obj) {
          return obj.title.indexOf(search) !== -1 || obj.content.indexOf(search) !== -1;
      });
    }
    response.status(200).json({'code':200, 'message': '', 'data':results});
  } catch (e) {
    console.log(e);
    response.status(500).json({'code':500, 'message':'Oops something went wrong'});
  }
});

app.post('/api/v1/notes', async (request, response) => {
  try {
    let data = request.body;
    const v = new Validator();
    const validate = v.validate(data, schema.addSchema);
    if (validate.errors.length>0){
      response.status(400).json({'code':400, 'message': 'Invalid Input'});
    }else{
      data = _.map(data,(x,n)=>{
        return _.assign(x, {
          id: + new Date() + n
        });
      })
      noteList = noteList.concat(data)
      notes.writeData(noteList);
      response.status(200).json({'code':200, 'message': 'Successfully created', 'data':data});
    }
  }catch (e) {
    console.log(e);
    response.status(500).json({'code':500, 'message':'Oops something went wrong'});
  }
});

app.put('/api/v1/notes', async (request, response) => {
  try {
    let data = request.body;
    const v = new Validator();
    const validate = v.validate(data, schema.editSchema);
    if (validate.errors.length>0){
      response.status(400).json({'code':400, 'message': 'Invalid Input'});
    }else{
      _.map(data, item => {
          let index = _.findIndex(noteList, {id: item.id});
          if(index>=0){
            noteList[index] = item 
          }
      });   
      notes.writeData(noteList);
      response.status(200).json({'code':200, 'message': 'Successfully created', 'data':data});
    }
  }catch (e) {
    console.log(e);
    response.status(500).json({'code':500, 'message':'Oops something went wrong'});
  }
});

app.delete('/api/v1/notes', async (request, response) => {
  try {
    const data = request.body;
    const v = new Validator();
    const validate = v.validate(data, schema.deleteSchema);
    if (validate.errors.length>0 || data.length==0){
      response.status(400).json({'code':400, 'message': 'Invalid Input'});
    } else {
      _.map(data, item => {
          _.remove(noteList, function(note) {
            return note.id === item;
        });
      });
      notes.writeData(noteList);
      response.status(200).json({'code':200, 'message': 'Successfully deleted'});
    }
  }catch (e) {
    console.log(e);
    response.status(500).json({'code':500, 'message':'Oops something went wrong'});
  }
});

app.get('*', function(req, res){
  res.status(404).json({'code':404, 'message':'Not Found'});
});

app.listen(8080);
