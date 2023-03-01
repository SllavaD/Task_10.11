// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightInput = document.querySelector('.minweight__input'); // поле ввода минимального веса
const maxWeightInput = document.querySelector('.maxweight__input'); // поле ввода максимального веса

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  
  fruitsList.innerHTML = null;

  for (let i = 0; i < fruits.length; i++) {

    let divIndex = document.createElement('div');
    divIndex.className = 'fruit__info';
    divIndex.textContent = 'index # ' + i;

    let divKind = document.createElement('div');
    divKind.className = 'fruit__info';
    divKind.textContent = 'kind: ' + fruits[i].kind;
    let divColor = document.createElement('div');
    divColor.className = 'fruit__info';
    divColor.textContent = 'color: ' + fruits[i].color;
    let divWeight = document.createElement('div');
    divWeight.className = 'fruit__info';
    divWeight.textContent = 'weight (кг): ' + fruits[i].weight;
    
    let divMain = document.createElement('div');
    divMain.className = 'fruit__info';
    divMain.appendChild(divIndex);
    divMain.appendChild(divKind);
    divMain.appendChild(divColor);
    divMain.appendChild(divWeight);

    let li_block = document.createElement('li');
    switch(fruits[i].color) {
     
      case 'фиолетовый': li_block.className = 'fruit__item fruit_violet'; break
      case 'зеленый': li_block.className = 'fruit__item fruit_green'; break
      case 'розово-красный': li_block.className = 'fruit__item fruit_carmazin'; break
      case 'желтый': li_block.className = 'fruit__item fruit_yellow'; break
      case 'светло-коричневый': li_block.className = 'fruit__item fruit_lightbrown'; break
      
    } 
    li_block.innerHTML = divMain.innerHTML;
    fruitsList.appendChild(li_block); 
  }
};

// первая отрисовка карточек
archiveArr = fruits.slice();
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  controlArr = fruits.slice();

  while (fruits.length > 0) {
        numRandom = Math.floor(Math.random() * fruits.length);
        result.push(fruits[numRandom]);
        fruits.splice(numRandom, 1);  
  }
  fruits = result;
  if (JSON.stringify(fruits) === JSON.stringify(controlArr)) {
    alert('Порядок не изменился! Поворите перемешивание!');
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let result = [];
  if (parseInt(minWeightInput.value) == 0 && parseInt(maxWeightInput.value == 0)) {  
    alert('Параметры фильтрации заданы некорректно!');
    return fruits;
  } 
  if (parseInt(minWeightInput.value) < 0 || parseInt(maxWeightInput.value < 0)) {
    alert('Вес фруктов не может быть отрицательным!');
    return fruits;
  } 
  if (parseInt(maxWeightInput.value) < parseInt(minWeightInput.value)) {
    alert('Максимальный вес не может быть меньше минимального веса!');
    return fruits;
  } 
    for (let i = 0; i < fruits.length; i++) {
      if ((fruits[i].weight >= parseInt(minWeightInput.value)) && (fruits[i].weight <= parseInt(maxWeightInput.value))) {
        result.push(fruits[i]);
      }
    }
    fruits = result;  
};

// сброс фильтрации 
const filterFruitsClear = () => {
  fruits = [];
  fruits = archiveArr.slice();
  minWeightInput.value = 0;
  maxWeightInput.value = 0;
  }
  
    filterButton.addEventListener('click', () => {
    fruits = archiveArr.slice();
    filterFruits();
    display();
  });

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

let priority = ['светло-коричневый', 'желтый', 'розово-красный', 'зеленый', 'фиолетовый'];

let start, end;

// функция сравнения двух элементов по цвету для функции bubbleSort
const comparation = (fruits1, k) => {
  return (fruits1.color === priority[k]) ? true : false;
};

function renameColorNum(arr) {
  for (c = 0; c < arr.length; c++) {
    switch(arr[c].color) {
      case 'фиолетовый': arr[c].color = 4; break
      case 'зеленый': arr[c].color = 3; break
      case 'розово-красный': arr[c].color = 2; break
      case 'желтый': arr[c].color = 1; break
      case 'светло-коричневый': arr[c].color = 0; break
    }
  }
};

function renameNumColor(arr) {
  for (c = 0; c < arr.length; c++) {
    switch(arr[c].color) {
      case 0 : arr[c].color = 'светло-коричневый'; break
      case 1 : arr[c].color = 'желтый'; break
      case 2 : arr[c].color = 'розово-красный'; break
      case 3 : arr[c].color = 'зеленый'; break
      case 4 : arr[c].color = 'фиолетовый'; break        
    }
  }
};

function swap(items, firstIndex, secondIndex){
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

function partition(items, left, right) {
  let pivot = items[Math.floor((right + left) / 2)].color,
      i = left,
      j = right;
  while (i <= j) {
      while (items[i].color < pivot) {
          i++;
      }
      while (items[j].color > pivot) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
}

// алгоритм пузырьковой сортировки
function bubbleSort(arr, comparation) {
  const n = arr.length;
  
  for (let k = 0; k < priority.length; k++){
   
    for (let i = 0; i < n-1; i++) { 
       
       for (let j = 0; j < n-1-i; j++) { 
          
          if (comparation(arr[j], k)) { 
              
              let temp = arr[j+1]; 
              arr[j+1] = arr[j]; 
              arr[j] = temp; 
            }
          }
      }
  }                    
};

// алгоритм быстрой сортировки
function quickSort(items, left, right) {
  let index;
  if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right);
      if (left < index - 1) {
          quickSort(items, left, index - 1);
      }
      if (index < right) {
          quickSort(items, index, right);
      }
  }
}

sortChangeButton.addEventListener('click', () => {
  sortKind = (sortKind === 'bubbleSort') ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

// функция вызова сортировки в зависимости от передоваемого параметра
function sort(typeSort) {
switch (typeSort) {
  case 'bubbleSort' : 
    bubbleSort(fruits, comparation);
  break;
  case 'quickSort' :
    renameColorNum(fruits);
    quickSort(fruits, 0, (fruits.length - 1));
    renameNumColor(fruits);
  break;
}
}

sortActionButton.addEventListener('click', () => {
  start = new Date().getTime(); 
  sort(sortKind);  
  end = new Date().getTime();
  sortTime = `${end - start} ms`;
  sortTimeLabel.textContent = sortTime;
  display();  
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '' || parseInt(weightInput.value) < 0) { 
    alert('Не все поля заполнены!');    
  } else {
      fruits.push({kind: kindInput.value, color: colorInput.value, weight: parseInt(weightInput.value)}); 
  }

  kindInput.value = null; 
  colorInput.value = null;
  weightInput.value = null;
  archiveArr = fruits.slice();
  display();
});