const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())


const filmeRotas = require('./routers/filmes_rotas.js');

app.use('/filmes', filmeRotas);


app.get('/', (req, res) => {
  res.send('Bon Jour');
})

const port = 3100;

app.listen(port, () => {
  console.log(`O servidor está rodando na porta http://localhost:${port}/`);
})
