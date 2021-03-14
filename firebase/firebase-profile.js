var userUID;
var date;
auth.onAuthStateChanged(user =>{
  if (user) {
    //если пользователь в системе
    userUID=user.uid;
    console.log("Добро пожаловать!");
    document.body.style.display="block";
    Main(userUID);
  } else {
    //если пользователь не в системе
     window.location.href="index.htm";
  }
});
function Main(userUID) {
  if (userUID) {
    rt.ref("Users/" + userUID).on("value",snapshot=>{
      let date = new Date();
      let month =(date.getMonth()-snapshot.val().birthMonth)*-1/12;
      let age=Math.round(date.getFullYear()- month - snapshot.val().birthYear);
      recipeout();
      calloriesStats(snapshot.val().height,snapshot.val().weight,snapshot.val().gender,age,snapshot.val().fA);
    });
    chat();
  } else {
    Main();
  }
}
function chat() {
  rt.ref("Message/").once("value",snapshot=>{
    let name = "",
        message="";
      snapshot.forEach(snapshotForEach => {
        name=snapshotForEach.child("name").val();
        message=snapshotForEach.child("text").val();
    var messageIn = `<div class="messageChatAllBlock" user-data="">
              <span class="messageChatAllBlock-name">`+name+`</span>
              <span class="messageChatAllBlock-mess">`+message+`</span>
            </div>`;
document.querySelector(".chatAll__container-chat").innerHTML+=messageIn;
document.querySelector(".chatAll__container-chat").scrollTop=document.querySelector(".chatAll__container-chat").scrollHeight;
      });
  })

  //отправка сообщения
  document.querySelector("#chattAllBtn").addEventListener("click",(event)=>{
  date = new Date();
  let userName = "",
      message=$(".chattAllMessage").val();
  let hash = date.getTime() + userUID;
  rt.ref("Users/" + userUID).on("value",snapshot=>{
        userName=snapshot.val().email;
  });
  if (message=="") {
    return;
  }
  rt.ref("Message/" + hash).set({
    name: userName,
    text: message,
    time: date.getTime()
  });
  $(".chattAllMessage").val("");
      if (userName==$(".messageChatAllBlock-name").val()) {
        $(".messageChatAllBlock").classList.add(".myMessageM");
      }
  });
}
// caloriesStats
function calloriesStats(height,weight,gender,age,fA) {
  switch (gender) {
    case "Male":gender=5; break;
    case "Female":gender=-161; break;
  }
  let dci = weight*10 + height*6.25-age*5+gender;
      dci = dci *fA;
  $(".calories__stats-number").text(dci.toFixed(2));
  $("#height").text(height);
  $("#weight").text(weight);
}
//recipe out
function recipeout(th) {
    rt.ref("Recipe/").on("value",snapshot=>{
      snapshot.forEach(snapshotEach => {
        console.log(snapshotEach)
        let text = `
        <div class="bluda__container-items" data-id="">`+snapshotEach.child("name").val()+`</div>
        `
        $("#recipe-out").append(text);
      });
    })
}
