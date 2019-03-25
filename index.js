const express = require('express');
const db = require ('./data/db');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Server');
})

server.get('/hubs', (req, res) =>{
    const hubs = db.hubs
    .find()
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch(({code, message}) => {
        res.status(code).json({
            success: false,
            message
        })
    })
})

server.post('/hubs', (req, res) => {
    const hubInfo = req.body;
    db.hubs
        .add(hubInfo)
        .then(hub => {
            res 
            .status(201).json({success: true, hub})
        })
        .catch(({code, message}) => {
            res.status(code).json({success: false, message})
        })
})

server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id
    db.hubs.remove(id).then(deleted =>{res.status(204).end()}).catch(({code, message}) =>{
        res.status(code).json({success: false, message})
    })
})

server.put('/hubs/:id', (req, res) =>{
    const{id} = req.params;
    const changes = req.body;
    db.hubs
        .update(id, changes)
        .then(updated => {
            if(updated){
                res
                    .status(200)
                    .json({
                        success: true,
                        updated
                    })
            } else{
                res.status(404)
                .json({
                    success: false,
                    message: 'Could not find hub'
                })
            }  
        })
        .catch(({code, message}) =>{
            res
            .status(code)
            .json({
                success: false,
                message
            })
        })
})

server.get('/now', (req, res) => {
    const date = new Date(Date.now()).toString();
    console.log(date);
    res.send(date);  

    
})

server.get('/hubs/:id', (req, res)=>{
    const id = req.params.id;
      db.hubs
        .findById(id)
        .then(hub =>{
            if(hub) {
                res
                    .status(200)
                    .json({success: true, hub})
            } else{
                res 
                    .status(404)
                    .json({
                        success: false,
                        message: "Could Not Match"
                    })

            }
        })
        .catch(({code, message}) =>{
            res.status(code).json({
                success: false,
                message
            })
        })
  })

server.listen(4000, () => {
    console.log('/n *** Server  Running on http://localhost: 4000 ***')
})
