/*
  Все функции в FireBase являются промисами:
  let promise = new Promise(); пример промиса
*/
// получить данные firestore
db.collection("users").get().then(snapshot=>{
  // users - название таблички
  //  snapshot - название аргумента(может быть любым)
  //  .docs - принимает из аргумента значения элементов коллекции
  snapshot.docs.forEach((elem) => {
    //arg.data() - принимает в себя значения snapshot.docs
    console.log(elem.data())
  });

});// обращаемся к коллекции по имени и вынимает всё из нее

// обращение к конкретному документу коллекции
db.collection("users").doc("users").get().then(elem=>{
  //вывести все
  console.log(elem.data())
  //вывести конкретный элемент таблицы
  console.log(elem.data().cell)
});
//добавление в коллекцию, 2 метода
//callname - название ячейки
//cellValue - значение таблички ячейки
db.collection("users").add({
  cellname: "cellValue"
});
// documentName - обращение к конкретному документу таблицы users
db.collection("users").doc("documentName").set({
  cellname: "cellValue"
});



// auth
// слушатель статуса авторизации
auth.onAuthStateChanged(user =>{
  if (user) {
    //если пользователь в системе
    // window.location.href="profile.html";
    console.log("Данные пользователя : ",user);

  } else {
    //если пользователь не в системе
    // window.location.href="index.htm";
  }
});

//регистрация по почте и паролю
//форма регистрации
const regForm = document.getElementById('registerForm');
regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let [mail, pass] = [
        regForm.querySelector('#email').value,
        regForm.querySelector('#pass').value
    ];
//    console.log(mail, pass);

// Обращаемся к firebase.auth() и к ее методу
//createUserWithEmailAndPassword который создает
//пользователя по мылу и паролю
auth.createUserWithEmailAndPassword(mail, pass).then(user=> {
        console.log(user);
});

}, false);

//выход из аккаунта
/*var logout = document.getElementById("logout");
logout.addEventListener("click",(e)=>{
  e.preventDefault();
  auth.signOut().then(()=>{
    window.location.href="index.htm";
  })
});*/

//signin
//форма входа
const loginForm=document.getElementById("authForm");
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    //получаем информацию о пользователе
    let mail = $("#emailAuth").val(),
        pass = $("#passAuth").val();
    auth.signInWithEmailAndPassword(mail,pass).then(cred=>{
    //  console.log(cred.user);
    });
})

//бд в реальном времени
db.collection("users").onSnapshot(snapshot=>{
  snapshot.docs// принмиает файл коллекции
});
