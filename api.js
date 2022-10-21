const client = require('./connection.js');
const app = require('./port.js');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

client.connect();

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id= ${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
});

app.post('/users', (req, res)=>{
    const user = req.body;

    let insertQuery = `insert into users(id, nome, sobrenome, email, datanascimento, senha, match)
                        values(${user.id}, '${user.nome}', '${user.sobrenome}', '${user.email}', '${user.datanascimento}', '${user.senha}', '${user.match}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }else{
            console.log(err.message)
        };
    });
    client.end;
});

app.put('/users/:id', (req, res)=>{
    let user = req.body;
    let updateQuery = `update users
                        set nome = '${user.nome}',
                        sobrenome = '${user.sobrenome}',
                        email = '${user.email}',
                        datanascimento = '${user.datanascimento}',
                        senha = '${user.senha}',
                        match = '${user.match}'
                        where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }else{
            console.log(err.message)
        };
    });
    client.end;
});

app.delete('/users/:id', (req, res)=>{
    let insertQuery = `delete from users where id = ${req.params.id}`;

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }else{
            console.log(err.message)
        };
    });
    client.end;
});