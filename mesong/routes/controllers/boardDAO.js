'use strict';

/**
 * Created by wealab04 on 2014-05-23.
 */

var connect = require('../controllers/dbconnect_v1.01.js');
var query = require('../controllers/query.js');

var c = connect.connection();


//연결로그 출력
c.on('connect', function () {
    console.log('DataBase connected');
}).on('error', function (err) {
    console.log('Client error: ' + err);
}).on('close', function (hadError) {
    console.log('Client closed');
});

exports.chk = function (req, res) {
    var id = req.body.account;
    var pswd = req.body.pswd;
    var sending = [];
    c.query(query.chkAccount, [id, pswd]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {

        if (sending[0] != null) {
            req.session.role = sending[0].role;
            var obj = {sending: sending};
            res.send(200, obj);
        } else {
            res.send(200, null);
        }
    })
};

exports.list = function (req, res) {
    var sending = [];
    console.log('this is get list');
    c.query(query.boardlist, null).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) {
            res.send(200, obj);
        } else {
            res.send(500, obj);
        }
    });
};

exports.get = function (req, res) {
    var id = req.body.id;
    var sending = [];
    c.query(query.boardget, [ id ]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) {
            res.send(200, obj);
        } else {
            res.send(500, obj);
        }
    });
};

exports.insert = function (req, res) {
    var title = req.body.usedInputTitle;
    var content = req.body.usedInputContent;
    var writer = req.body.usedInputname;
    var company = req.body.usedInputCompany;
    var contact = req.body.usedInputCall;
    var email = req.body.usedInputEmail;
    if (email == null || email == '') {
        email = '이메일 입력 안함';
    }
    console.log('title : ' + title)
    // title, content, file, writer, href
    c.query(query.boardinsert, [ title, content, writer, company, contact, email ]).on('result', function (res) {
        res.on('row', function (row) {
        });
    }).on('end', function () {
        res.render('1400-request/050-1400-requestWrite', {title: 'Mesong'});
    });
};

exports.insertF = function (req, res) {
    var file = req.files.file;
    var dir = '\public/images/';
    var name = new Date().getTime() + file.name;

    if (file.type == 'image/jpeg' || file.type == 'image/png') {
        fs.readFile(file.path, function (error, data) {
            fs.writeFile(dir + name, data, function (error) {
                if (error) {
                    throw error
                }
                res.send(name);
            });
        });

    } else {
        res.send(500, '이미지파일만 첨부가능합니다.');
    }
};

exports.update = function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    var contact = req.body.contact;
    var email = req.body.email;

    console.log(title);
    console.log(content);
    console.log(file.name);
    console.log(href);

// title, content, file, href, id
    c.query(query.boardmodify, [ title, content, contact, email, id ]).on('result', function (res) {
        res.on('row', function (row) {
        });
    }).on('end', function () {
        var obj = '수정하였습니다.';
        res.send(200, obj);
    });
};

exports.delete = function (req, res) {
    var id = req.body.id;

    c.query(query.boardremove, [id]).on('result', function (res) {
        res.on('row', function (row) {
        });
    }).on('end', function () {
        var obj = '삭제하였습니다.';
        res.send(200, obj);
    });
};
/*
 exports.delete = function(req,res){
 var id = req.body.id;
 var file = req.body.file;
 var dir = '\public/images/';
 console.log(id);

 c.query(query.boardremove,[ id ]).on('result',function(res){
 res.on('row',function(row){});
 }).on('end',function(){
 if(file=='no file'){
 var obj = '삭제하였습니다.';
 res.send(200,obj);
 }else{
 fs.unlink(dir+file, function (err) {
 if (err) throw err;
 console.log('successfully file deleted');
 var obj = '삭제하였습니다.';
 res.send(200,obj);
 });
 }
 })
 };*/
