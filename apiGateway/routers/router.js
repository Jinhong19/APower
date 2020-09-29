const express = require('express')
// var Express = require('express')
var router = express.Router()
var axios = require('axios')
var registry = require('./registry.json')
var fs = require('fs')

// .all takes all kinds of request POST, GET ...
router.all('/:apiName/:path', (req, res) => {
    console.log("called "+ req.params.apiName)
    //check if the api exist in registry
    if(registry.services[req.params.apiName]){ 
        axios({
            method: req.method,
            url: registry.services[req.params.apiName].url + req.params.path,
            headers: req.headers,
            data: req.body
        }).then(
            (response) => {
                res.send(response.data)
            }
        )
    }
    else{
        res.send("API name doesn't exist")
    }
})

//Auto register for new api
// following code to use above post request:
// curl -X POST -d '{"apiName": "test","host": "http://localhost","port": 3001,"url": "http://localhost:3001/"}'
// -H 'Content-Type: application/json' http://localhost:3000/register
router.post('/register', (req,res) => {
    var registrationInfo = req.body
    registry.services[registrationInfo.apiName] = {...registrationInfo}

    fs.writeFile('./routers/registry.json', JSON.stringify(registry), (error) => {
        if(error){
            res.send("Failed to register the new API! \n" + error)
        }
        else{
            res.send("Successfully register the new API" + registrationInfo.apiName)
        }
    })
})



module.exports = router