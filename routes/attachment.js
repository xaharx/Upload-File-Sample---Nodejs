var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res, next) {

    // Find folder name of attachment
    files =  fs.readdirSync('attachment');

    var f = [] ;
    for(i = 0;i < files.length; i++){
        f.push('/'+files[i]);
    }

    res.send({status:'0',message: '',files:f});
});

router.get('/:id', function(req, res, next){

    try {
        files =  fs.readdirSync('attachment/'+req.params.id);

        var f = [] ;
        for(i = 0;i < files.length; i++){
            f.push('/'+req.params.id+'/'+files[i]);
        }

        res.send({status:'0',message: 'Directory Exist',files:f});


    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('File not found!');
        } else {
            throw err;
        }

        res.send({status:'1',message: 'Directory Not Exist',files:[]});
    }
});

module.exports = router;