const client = require('./connection.js');
const app = require('./port.js');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

client.connect();

//get all
app.get('/estabelecimento', (req, res)=>{
    client.query(`SELECT * from estabelecimento`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

//get id
app.get('/estabelecimento/:id', (req,res)=>{
    client.query(`SELECT * FROM estabelecimento WHERE id = ${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
});

//post
app.post('/estabelecimento', (req,res)=>{
    const estabelecimento = req.body;

    let insertQuery = `INSERT INTO estabelecimento(id, nome, email, senha, endereco, tipoestabelecimento, telefone)
                        VALUES(${estabelecimento.id}, '${estabelecimento.nome}', '${estabelecimento.email}','${estabelecimento.senha}', '${estabelecimento.endereco}', '${estabelecimento.tipoestabelecimento}' ,'${estabelecimento.telefone}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }else{
            console.log(err.message)
        };
    });
    client.end;
});

//put
app.put('/estabelecimento/:id', (req, res)=>{
    let estabelecimento = req.body;
    let updateQuery = `update estabelecimento
                        set nome = '${estabelecimento.nome}',
                        email = '${estabelecimento.email}',
                        senha = '${estabelecimento.senha}',
                        endereco = '${estabelecimento.endereco}',
                        tipoestabelecimento = ${estabelecimento.tipoestabelecimento},
                        telefone = ${estabelecimento.telefone}
                        where id = ${estabelecimento.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }else{
            console.log(err.message)
        };
    });
    client.end;
});

//delete
app.delete('/estabelecimento/:id', (req, res)=>{
    let insertQuery = `delete from estabelecimento where id = ${req.params.id}`;

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }else{
            console.log(err.message)
        };
    });
    client.end;
});