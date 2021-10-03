const urlApi = 'http://localhost:3100/filmes';
const listagem = document.getElementById('lista');
const visto =   document.getElementById('assistido')
let edicao = false;
let idEdicao = 0;
letView = true;



const getFilmes = async () => {
  const response = await fetch(urlApi);
  const dados = await response.json();
  console.log(dados);

  dados.map((filme) => {
    listagem.insertAdjacentHTML('beforeEnd', `
    <div class="col-4">
      <div class="card p-2 m-3">
        <div class="card-header">
          <h2 align="center">${filme.titulo}</h2>
        </div> 
        <div align="center" class="p-4" id="view")>
        </div>
        <div align="center">
        <img src="${filme.imagem}" alt="Pôster do Filme">
        </div>
        <div class="card-body">
          <p class="card-text" align="center">Gênero: ${filme.genero}</p>
          <p class="card-text" align="center" >Nota: ${filme.nota}</p>
          </div>
          <div align="center">
          <button type="button" class="btn btn-primary" onclick="putFilme(${filme.id})">Editar</button>
          <button type="button" class="btn btn-danger" onclick="deleteFilme(${filme.id})">Excluir</button>
          <button type="button" class="btn btn-outline-warning"" onclick="statusView(${filme.id})" id="assistido">Visto</button>
          </div>
      </div>
    </div>
    `)
  });
};
getFilmes();

const submitForm = async (e) => {
  e.preventDefault();

  let imagem = document.getElementById('imagem');
  let titulo = document.getElementById('titulo');
  let genero = document.getElementById('genero');
  let nota = document.getElementById('nota');

  const filme = {
    imagem: imagem.value,
    titulo: titulo.value,
    genero: genero.value,
    nota: nota.value
  }


  if(!edicao) { 
    const request = new Request(`${urlApi}/add`, {
      method: 'POST',
      body: JSON.stringify(filme),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    
    const response = await fetch(request);
    const result = await response.json();

    if(result) {
      getFilmes();
    }

  } else {
    const request = new Request(`${urlApi}/${idEdicao}`, {
      method: 'PUT',
      body: JSON.stringify(filme),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

    const response = await fetch(request);
    const result = await response.json();

    if(result) {
      getFilmes();
    }
  }

  imagem.value = '';
  titulo.value = '';
  genero.value = '';
  nota.value = '';
  listagem.innerHTML = '';
}

const getFilmeById =  async (id) => {
  const response =  await fetch(`${urlApi}/${id}`);
  return filme = response.json();
}

const putFilme = async (id) => {
  edicao = true;
  idEdicao = id;
  const filme = await getFilmeById(id);

  let imagemAtt = document.getElementById('imagem');
  let tituloAtt = document.getElementById('titulo');
  let generoAtt = document.getElementById('genero');
  let notaAtt = document.getElementById('nota');
  
  imagemAtt.value = filme.imagem;
  tituloAtt.value = filme.titulo;
  generoAtt.value = filme.genero;
  notaAtt.value = filme.nota
}


const deleteFilme = async (id) => {
  const request = new Request(`${urlApi}/${id}`, {
    method: 'DELETE',
  })
  const response = await fetch(request);
  const data = await response.json();
  console.log(data.message);

  lista.innerHTML = '';
  getFilmes();
}



//Visto nos filmes assistidos, não funcionou, mas eu tentei kkkkk.
const statusView = visto.addEventListener('OnClick', (evento) ={
  If(letView = true) {
    letView = false},},
  visualizado())

const visualizado = async (id) => {
  if (letView == true) {
    visto.insertAdjacentHTML('beforeEnd', `
    <i class="fa fa-eye" aria-hidden="true"></i>`)
} else {
  visto.insertAdjacentHTML('beforeEnd', `
  <i class="fa fa-eye-slash" aria-hidden="true"></i>
  `)
}}
