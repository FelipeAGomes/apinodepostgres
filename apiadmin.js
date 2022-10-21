const client = require('./connection.js');
const app = require('./port.js');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

client.connect();

app.get('/admin', (req, res)=>{
    client.query(`SELECT * FROM admin`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

app.get('/admin/:id', (req, res)=>{
    client.query(`Select * from admin where id = ${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
});

app.post('/admin', (req, res)=>{
    const admin = req.body;

    let insertQuery = `insert into admin(id, nome, sobrenome, email, nivelacesso)
                        values(${admin.id}, '${admin.nome}', '${admin.sobrenome}', '${admin.email}', '${admin.nivelacesso}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful');
        }else{
            console.log(err.message);
        };
    });
    client.end;
});

app.put('/admin/:id', (req, res)=>{
    let admin = req.body;
    let updateQuery = `update admin
                        set nome = '${admin.nome}',
                        sobrenome = '${admin.sobrenome}',
                        email = '${admin.email}',
                        nivelacesso = ${admin.nivelacesso}
                        where id = ${admin.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }else{
            console.log(err.message)
        };
    });
    client.end;
});

app.delete('/admin/:id', (req, res)=>{
    let insertQuery = `DELETE FROM admin WHERE id = ${req.params.id}`;

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }else{
            console.log(err.message)
        };
    });
    client.end;
});