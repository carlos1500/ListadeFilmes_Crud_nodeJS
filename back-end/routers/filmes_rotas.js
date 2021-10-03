const express = require('express');
const router = express.Router();

const filmes = [
  {
    id: Date.now(),
    imagem: "https://br.web.img3.acsta.net/c_310_420/pictures/210/462/21046251_20131002221316773.jpg",
    titulo: "Dançando no Escuro",
    genero: "Drama",
    nota: "5",
  },
]

//Rotas de Leitura por lista e individual
router.get('/', (req, res) => {
  res.send(filmes);
})

router.get('/:id', (req, res) => {
  const idParam = req.params.id;
  const index = filmes.findIndex(filme => filme.id == idParam);
  const filme = filmes[index];
  res.send(filme);
})


// Rota de adição de filme
router.post('/add', (req, res) => {
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
      message: `O filme ${filme} foi cadastrado com sucesso!`,
      data: filme
    });
  })
  
//Rota de Atualização
router.put('/:id', (req, res) => {
  const filmeAtt = req.body;
  const id = req.params.id;
  let filmeAnterior = filmes.find((filme) => filme.id == id);
  
   filmeAnterior = {
   ...filmeAnterior,
  ...filmeAtt
}
  res.send({
    message: `O filme: ${filmeAnterior.id} foi atualizado com sucesso`,
    data: filmeAnterior
  })
})

//Rota de deleção
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = filmes.findIndex((filme) => filme.id == id);
  filmes.splice(index, 1);

  res.send({
    message: `O filme foi removido da sua lista`,
  })
})

module.exports = router;