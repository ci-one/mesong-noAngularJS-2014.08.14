/**
 * Created by wealab04 on 2014-05-30.
 */
//쿼리를 나열하고 exports를 통해 배포하도록 한다.

exports.chkAccount = 'select * from account where account=? and pswd=?';

exports.boardlist = 'SELECT * FROM board_test order by id desc';

exports.boardget = 'select * from board_test where id=?';


// title, content, file, writer, href
exports.boardinsert = 'insert into board_test(id, title, content, writer,company, contact, email, date) values(null,?,?,?,?,?,?,now())';
// title, content, file, href, id
exports.boardmodify = 'update board_test set title=?, content=?, contact=?, email=?, date=now() where id=?';

exports.boardremove = 'delete from board_test where id=?';