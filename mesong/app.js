/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path') ////////////인입 for ym
    , api = require('./routes/controllers/api')
    , board = require('./routes/controllers/boardDAO');
var app = express();
// all environments
app.engine('html', require('ejs').renderFile);
app.set('port', process.env.PORT || 3401);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//////인입 for cione

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}



app.post('/getdata',board.chk);

app.post('/getlist',board.list);

app.post('/getboard',board.get);

app.post('/insertboard', board.insert);

app.post('/updateboard', board.update);

app.post('/deleteboard',board.delete);

app.get('/',routes.lease);
app.get('/insertboard',routes.boardI);
app.get('/listboard',routes.boardL);
app.get('/detailboard',routes.boardD);

app.get('/api/awesomeThings',api.awesomeThings);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
