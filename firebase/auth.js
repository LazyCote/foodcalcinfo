auth.onAuthStateChanged(user =>{
  if (user) {
    //если пользователь в системе
    //window.location.href="profile.html";
    console.log(user.email);
  } else {
    //если пользователь не в системе
    console.log("logout");
  }
});
//регистрация
const regForm = document.getElementById('registerForm');
regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let [mail, pass] = [
        regForm.querySelector('#email').value,
        regForm.querySelector('#pass').value
    ];

auth.createUserWithEmailAndPassword(mail, pass).then(()=>{
  auth.signInWithEmailAndPassword(mail,pass).then(cred=> {
    // console.log("Данные пользователя after reg: ",cred);
    //  console.log("Данные пользователя ид ",cred.user.uid);
    //  console.log("Данные пользователя почта ",cred.user.email);
    rt.ref("Users/"+ cred.user.uid).set({
      email: cred.user.email,
      birthDay: regForm["day"].value,
      birthMonth: regForm["month"].value,
      birthYear: regForm["year"].value,
      gender: regForm["gender"].value,
      height: 0,
      weight: 0,
      lvl: 0,
      name: regForm["name"].value,
      pass: regForm["pass"].value,
      fA:1.38
    }).then(response=>{
      window.location.href="profile.html";
    });
  })

  }, false);
});
//авторизация
const loginForm=document.getElementById("authForm");
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    //получаем информацию о пользователе
    let mail = $("#emailAuth").val(),
        pass = $("#passAuth").val();
    auth.signInWithEmailAndPassword(mail,pass).then(cred=>{
    window.location.href="profile.html";
    });
})
