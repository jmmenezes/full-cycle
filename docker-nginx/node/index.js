const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql2/promise');

app.get('/', async (req, res) => {

    // 1. Conexão com Mysql
    const connection = await mysql.createConnection(config);

    try {
        // 2. Geramos o nome randômico e inserimos
        let randomName = "Nome Randomico " + (Math.random() + 1).toString(36).substring(7);
        const sqlInsert = 'INSERT INTO people(name) VALUES(?)';
        await connection.execute(sqlInsert, [randomName]);

        // 3. Buscamos a lista atualizada
        const [rows] = await connection.execute('SELECT name FROM people');

        // 4. Montamos a resposta
        let htmlResponse = '<h1>Full Cycle Rocks!</h1>';
        htmlResponse += '- Lista de nomes cadastrada no banco de dados.<br/>';
        htmlResponse += '<ul>';
        
        for (const person of rows) {
            htmlResponse += `<li>${person.name}</li>`;
        }
        
        htmlResponse += '</ul>';

        // 5. Enviamos a resposta
        res.send(htmlResponse);

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('Erro ao processar dados');
        }
    } finally {
        await connection.end();
    }
});

app.listen(port, ()=> {
    console.log('Node executnado na porta ' + port)
})
