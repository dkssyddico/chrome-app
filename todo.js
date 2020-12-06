const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList');
// ul

const TODOS_LS = 'toDos';

let idNumbers = 1;

// function filterFn(toDo) {
//   return toDo.id === 1;
// }
// filter는 array의 모든 아이템을 통해 함수를 실행하고 true인 아이템들만 가지고 새로운 array를 만든다.
// filter는 forEach에서 function을 실행하는 것 같이 각각의 item에 대해 실행한다.

let toDos = [];
// 할 일 목록이 많아질 수 있어 array에 넣어주고, 해야 할 일을 생성했을 때 그게 toDos array에 추가될 수 있도록.

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // 어느 버튼이 클릭되었는지 알 수 있도록. target
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
    // 지워진 id와 to의 id가 같지 않을 때.
    // 즉 지워지지 않은 애들로만 새로운 array가 생기고, LS에 저장한다.
    // 모든 toDos가 li의 id와 같지 않을 때
    // filter도 array에 쓰는 함수.
    // string을 숫자로 만들어줌.
  });
  // filterFn이 x 체크가 된 아이템들의 array를 주는 것
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
// toDos를 저장.
// JSON.stringify는 자바스크립트 object를 string으로 바꿔줌.
// 자바스크립트는 로컬 스토리지에 있는 모든 데이터를 string으로 저장하려고 한다. 그래서 object가 string이 되도록해야 함.
// 맨처음에 하면 Application에 [object Object]로 표시됨.

function paintToDo(text) {
  // console.log(text);
  const li = document.createElement('li');
  // 생성하는 함수.
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = idNumbers;
  idNumbers += 1;
  // 위에 정의한 idNumbers를 1로 하고, 지워도 새로운 아이디를 가지게 한다.
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  // span, delBtn을 li안에 append하고(생성)
  toDoList.appendChild(li);
  // 뭔가를 그의 father 안에 넣는 것. 여기서는 ul 안에 li가 생김
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  // push를 써서 array안에 element 하나를 넣어줄 수 있다.
  // toDos array에 toDoObj를 넣는다.
  // 로컬스토리지에 저장할 수 있게 만든다.
  saveToDos();
}

// 두번째.
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
  // 입력하고 enter하면 새로고침한 것처럼 보이게.
}

// 첫번째 만든 것.
function loadtoDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // console.log(loadedToDos);
    // [{"text":"dsf","id":1},{"text":"dsfsd","id":2}] -> string임.
    const parsedToDos = JSON.parse(loadedToDos);
    // console.log(parsedToDos);
    // object 형태로 불러올 수 있게 해주는 것.
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
    // console.log(toDo.text);
    // forEach는 array에 담겨있는 것들 각각에 한번씩 함수를 실행.
    // array 안에 각각 할일(=toDo)의 text가 호출되게 함.
  } else {
  }
}

function init() {
  loadtoDos();
  // 뭔가를 로드해야 하는 데 그건 로컬 스토리지에서 온 것.
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
