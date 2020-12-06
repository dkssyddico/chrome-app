const form = document.querySelector('.js-form'),
  input = form.querySelector('input'),
  greeting = document.querySelector('.js-greetings');
//  h4 = .js-greetings

const USER_LS = 'currentUser',
  SHOWING_CN = 'showing';

function saveName(text) {
  localStorage.setItem(USER_LS, text);
  // setItem(key, value)
  // localStorage가 내 유저 네임을 기억하게 만드는 것.
}

function handleSubmit(event) {
  event.preventDefault();
  // 이벤트가 일어나면 root에서 일어남. document까지 발생. 버블처럼. 이런 현상을 막는 것임. 다른 곳으로 넘어가지 않도록. 새로고침처럼 안되게 막아주는 것. 이벤트를 막아준다고 생각하면 된다.
  const currentValue = input.value;
  // input.placeholder처럼 value를 얻는 것
  // console.log(currentValue);
  paintGreeting(currentValue);
  saveName(currentValue);
}

// LS에 저장된 유저가 없을 때 행동
function askForName() {
  form.classList.add(SHOWING_CN);
  // showing이라는 클래스로 인해 form이 보여짐
  form.addEventListener('submit', handleSubmit);
  // enter를 눌럿을 때 알아차리길 원함. 제출했을 때 function이 실행
}

// 유저가 있을 때 행동
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  // 위는 색칠하면 이름 물어보는 form을 숨겨야 해서 넣는 것.
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
  // 글자를 적으면 뜨게 하는 것.
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
    // 유저가 없는 경우
  } else {
    // she is
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();

// localStorage.setItem("nico", True)
// 로컬 스토리지에서 얻기. localStorage.getItem('nico')
