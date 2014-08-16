
exports.lease = function(req, res){
    res.render('index',{title:'Mesong'});
}
exports.boardI = function(req, res){
    res.render('1400-request/050-1400-requestWrite',{title:'Mesong'});
}
exports.boardL = function(req, res){
    res.render('1400-request/050-1410-requestList',{title:'Mesong'});
}
exports.boardD = function(req, res){
    res.render('1400-request/050-1420-requestDetail',{title:'Mesong'});
}