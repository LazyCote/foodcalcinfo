// получить данные firestore
db.collection("users").get().then(snapshot=>{
  console.log(snapshot.docs);
});// обращаемся к коллекции по имени и вынимает всё из нее

// все что ниже это auth
// слушатель статуса авторизации
auth.onAuthStateChanged(user =>{
  if (user) {
    //если пользователь в системе
    // window.location.href="profile.html";


  } else {
    //если пользователь не в системе
    // window.location.href="index.htm";
  }
});



//регистрация по почте и паролю
const regForm = document.getElementById('registerForm');
console.log(regForm);
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
    auth.createUserWithEmailAndPassword(mail, pass).then(function(user) {
        console.log(user);
    });

}, false);

//выход из аккаунта
var logout = document.getElementById("logout");
logout.addEventListener("click",(e)=>{
  e.preventDefault();
  auth.signOut().then(()=>{
    window.location.href="index.htm";
  })
});

//signin
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
