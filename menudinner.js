let showBreakfastDrink = '';
let showBreakfastFood = '';
let showLunchDrink = '';
let showLunchFood = '';
let showLunchAcc = '';
let showOrder = '';
let orderDrinkFood = [];
let userchoice = true;
const currentDate = new Date();
const hour = currentDate.getHours();

const menus = [
  { 
    title: 'Desayuno',
    breakfast:[
      {id: 1, tipo: 'drink', nombre:'Cafe', precio:1},
      {id: 2, tipo: 'drink', nombre:'Infusión', precio:1},
      {id: 3, tipo: 'drink', nombre:'Zumo', precio:2},
      {id: 11, tipo: 'eat', nombre:'Tostadas con tomate y aceite', precio:2},
      {id: 12, tipo: 'eat', nombre:'Napolitana de chocolate', precio:1},
      {id: 13, tipo: 'eat', nombre:'Huevos revueltos con jamón', precio:2}
    ]    
  },
  {
    title: 'Comida y Cena',
    lunchdinner:[
      {id:21, tipo:'drink', nombre:'Agua', precio:1},
      {id:22, tipo:'drink', nombre:'Copa de vino', precio:2}, 
      {id:23, tipo:'drink', nombre:'Copa de cerveza', precio:2},
      {id:31, tipo:'main', nombre:'Chuletillas de cordero', precio:6},
      {id:32, tipo:'main', nombre:'Txuleta a la brasa', precio:12},
      {id:33, tipo:'main', nombre:'Lubina al horno', precio:10},
      {id:41, tipo:'acc', nombre:'Patatas fritas', precio:5},
      {id:42, tipo:'acc', nombre:'Pimientos verdes', precio:8},
      {id:43, tipo:'acc', nombre:'Ensalada de lechuga y cebolleta', precio:6},
    ]
  }
];


// Iteración por el array para ir sacando los elementos que necesito y poder llamarlos más adelante

for(const menu of menus){
  const menuBreakfast = menu.breakfast;
  const menuLunchDinner = menu.lunchdinner;

  if(menuBreakfast){
    for(const item of menuBreakfast){
      if(item.tipo == "drink"){
         showBreakfastDrink += `${item.id}: ${item.nombre} ${item.precio}€\n`; 
      } if (item.tipo == "eat"){
          showBreakfastFood += `${item.id}: ${item.nombre} ${item.precio}€\n`;
      }
    }
  }
  if(menuLunchDinner){
     for(const item of menuLunchDinner){
        if(item.tipo == "drink"){
          showLunchDrink += `${item.id}: ${item.nombre} ${item.precio}€\n`;
        } if (item.tipo == "main"){
            showLunchFood += `${item.id}: ${item.nombre} ${item.precio}€\n`;
          } if (item.tipo =="acc"){
                showLunchAcc += `${item.id}: ${item.nombre} ${item.precio}€\n`;
          }
      }
  }
}

// Función para que solo te de opción un menú dependiendo de la hora que sea.

function schedule(){
  
  alert (`Bienvenidos a nuestro restaurante:\n\nEl menú desayuno está disponible de 7 am - 11 am \nEl menú comidas está disponible de 12 pm - 16 pm \nEl menú cenas está disponible de 18 pm - 23 pm \n\nTe redirigimos al menú disponible`);
  
  if (hour >= 7 && hour <= 11){
    orderBreakfast();
  }
  else if (hour > 11 && hour <=16){
    orderLunchDinner();
  }
  else if (hour > 18 && hour <=23){
    orderDinner();
  } 
  else if (hour >= 00 && hour <7){
    alert('En estos momentos el restaurante está cerrado. Nuestro horario es de 7am a 23pm. Disculpe las molestias.')
  }
}

// Función dónde se guardan las bebidas o platos seleccionados de la función order, se guardan en un nuevo array.

function addOrder (selection){
  
  if(selection){
    orderDrinkFood.push({ nombre: selection.nombre});
    orderDrinkFood.push({ precio: selection.precio});
    showOrder += `\n${selection.nombre} ${selection.precio}€`;
    }    
}


// Función dónde se calcula el total de todos lo que se ha seleccionado
function priceOrder(){
  
  let sumPedido = 0;
  let incremento = 0;
  let total = 0;
  
  const cost = orderDrinkFood.reduce((total, value) => {
    if(value.precio !== undefined){
      sumPedido += value.precio;
      if (hour > 18 && hour <=23){
        incremento += parseFloat((value.precio * 0.25).toFixed(2));
      }
    }
  },0);
 
  total = sumPedido + incremento;
  
  alert (`Su pedido actual es: ${showOrder}\n\nEl coste del pedido es: ${sumPedido}€ y el incremento es: ${incremento}€\n\nTotal a pagar: \n${total}€`);
}

// Función de pedido, aquí es dónde utilizando prompt el usuario selecciona su bebida y comida, del menú que le corresponde por horario.

function order(title, menu, tipo, menuselection, ids){
  
  while (userchoice == true) {
    let selectOrder = prompt(`Menú ${title}\n\¿Que te apetece de ${tipo}?(Introduce el nº de tu elección)\n\n${menu}\n\Pulsa 0 para salir`);
    
    if (selectOrder === null || selectOrder === ''){
      alert('Hay que introducir un numero de la lista ó pulsa 0 para continuar');
      
    } else {
      selectOrder = parseInt(selectOrder);
      if(selectOrder === 0){
        userchoice = false;
        
      } else if(!isNaN(selectOrder) && ids.includes(selectOrder)){  
          waitress();
          const orderSelected = menuselection.find(item => item.id === selectOrder);
     
            if(orderSelected){
                  addOrder(orderSelected);
            } else{
              alert('Hay que introducir un numero de la lista ó pulsa 0 para continuar')
              }
            let selectMore = confirm(`Menú ${title}\n\¿Quieres elegir algo más?`);
            if (selectMore === false){
              userchoice = false;
            }
        }
          else{
            alert('Hay que introducir un numero de la lista ó pulsa 0 para continuar')
          }
      } 
  }
}  

// Función desayuno
  
function orderBreakfast(){
  
  userchoice = true;
  order(menus[0].title, showBreakfastDrink, 'bebida', menus[0].breakfast, [1, 2, 3]);
  userchoice = true;
  order(menus[0].title, showBreakfastFood, 'comida', menus[0].breakfast, [11, 12, 13]);
  priceOrder();
}

//Función comida

function orderLunchDinner(){
  
  userchoice = true;
  order(menus[1].title, showLunchDrink, 'bebida', menus[1].lunchdinner, [21, 22, 23]);
  userchoice = true;
  order(menus[1].title, showLunchFood, 'comida', menus[1].lunchdinner, [31, 32, 33]);
  userchoice = true;
  order(menus[1].title, showLunchAcc, 'acompañamiento', menus[1].lunchdinner, [41, 42, 43], 2);
  priceOrder();
}

//Función cena

function orderDinner(){
  alert('El menú de cenas tiene un incremento del precio de un 25%');
  orderLunchDinner();
}

// Función dónde generamos comentarios aleatorios
function waitress(){
  const comments = ['¡Qué bueno lo que has pedido!', 'Muy buena elección', 'Espero que todo esté de su agrado', 'Si necesita ayuda no dude en llamarnos', 'Ese es uno de nuestros platos estrella'];
  const comentRandom = comments[Math.floor(Math.random() * comments.length)];
  alert(`${comentRandom}`);
}

// Primera función a la que llamamos.
schedule();