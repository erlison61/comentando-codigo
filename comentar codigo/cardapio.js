//importando itens de dataset para o cadapio
import itens from './model/dataset.js';
//importando conteúdo de foods.js para cardapio.js
import foodsModel from './model/foods.js';

foodsModel.load(itens);
let foods = foodsModel.readAll();

function initFoodsCard () {
  
  for (let item of foods) {

    const view = createFoodCardItem(item);
  
    //let itensCardapio = document.querySelector('.itens-cardapio');
    let itensCardapio = document.getElementById("itens-cardapio");
    itensCardapio.insertAdjacentHTML('beforeend', view);
  }
}

function createFoodCardItem (item) {

    const view = `<div class="col-3 card my-1 mx-1 py-1">
                    <img src="${item.imagem}" class="card-img-top" alt="...">
  
                    <div class="card-body">
                      <h5 class="card-title">${item.nome}</h5>
                      <p class="card-text">${item.descricao}</p>
                      <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                  </div>`;

    return view;
}


// Captar o evento de submissão do formulário e adicionar o item no cartão (card).
// const foodForm = document.querySelector('#foodForm');
const foodForm = document.getElementById("foodForm");

foodForm.onsubmit = function (event) {
  // Previnir que o modal fique abrindo e fechando em loop.
  event.preventDefault();
  //variavel que vai pegar os dados e armazenar no dataset e permite manipular
  let newFood = Object.fromEntries(new FormData(foodForm));
  foodsModel.create(newFood);
  //ira gerar no html uma imagem com descrição e valor
  const foodCard = createFoodCardItem(newFood);
  let itensCardapio = document.getElementById("itens-cardapio");
  itensCardapio.insertAdjacentHTML('beforeend', foodCard);
}

initFoodsCard();