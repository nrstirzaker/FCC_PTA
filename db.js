var fs = require('fs');
var pg = require('pg');

var dbFunc = function () {

    var client;

    function connect() {
        var conString = process.env.DATABASE_URL || 'local';
        if (conString != 'local'){
            console.log( 'conString : ' + conString );
            client = new pg.Client(conString);
            client.connect();
            return true;
        }else{
            return false;
        }

    }

    function insert(fullname, email, ip) {
        //var sql = "insert into register (fullname, email, ip) " +
        //"values ('" + fullname + "','" + email + "','" + ip + "')";
        var sql = 'insert into register (fullname, email, ip,crypto_on) ' +
        'values ($1,$2,$3,$4);'

        console.log('sql: ' + sql);

        var query = client.query( sql,[fullname,email,ip,"1"] );
        query.then((res) => {
            console.log("saved");
        });
    }

    function insertData(fullname, email,ip){
        if (connect()){
            insert(fullname, email, ip);
        }else{
            console.log("fullname: " + fullname + "," + "email: " + email +"," + "ip: " + ip);
        }
       
    }
    return {
            insertData: insertData
    }
}();


exports.insertData = dbFunc.insertData;

