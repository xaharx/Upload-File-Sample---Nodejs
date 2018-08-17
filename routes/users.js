var express = require('express');
var router = express.Router();

var fs = require('fs');


router.post('/upload', function(req, res) {

    if (!req.files)
        return res.status(400).send({status:'1',message: 'No file was uploaded'});

    var id = req.body.id;
    let sampleFile = req.files.file;

    try {
        files =  fs.readdirSync('attachment/'+id);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('Folder not found!');
        } else {
            throw err;
        }

        fs.mkdirSync('attachment/'+id);
    }

    sampleFile.mv('attachment/'+id+'/'+sampleFile.name, function(err) {
        if (err)
            return res.status(500).send({status:'1',message: 'Directory Not Exist',files:[]});

        res.status(200).send({status:'0',message: 'Uploaded Successfully',filePath:'/'+id+'/'+sampleFile.name});
    });

});

module.exports = router;