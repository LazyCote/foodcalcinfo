var userUID;
var date;
auth.onAuthStateChanged(user =>{
  if (user) {
    //если пользователь в системе
    userUID=user.uid;
    console.log("Добро пожаловать!");
    document.body.style.display="block";
    console.log(user)
    Main(userUID);
  } else {
    //если пользователь не в системе
    console.log("logout");
    document.body.style.display="none";
    window.location.href="index.htm";
  }
});
function Main(userUID) {
  if (userUID) {
    rt.ref("Users/" + userUID).on("value",snapshot=>{
      $("#userName").text(snapshot.val().name);
      $("#userEmail").text(snapshot.val().email);
      let date = new Date();
      let month =(date.getMonth()-parseFloat(snapshot.val().birthMonth))*-1/12;
      let age=Math.round(date.getFullYear()- month - snapshot.val().birthYear);
      calc();
      calloriesStats(parseFloat(snapshot.val().height),parseFloat(snapshot.val().weight),snapshot.val().gender,age,parseFloat(snapshot.val().fA));
    });

    recipeout();
    chat();
  } else {
    setTimeout(()=>{console.log("рекурсия");Main();},2000)
  }
}
function chat() {
  rt.ref("Message/").once("value",snapshot=>{
    let name = "",
        message="";
      snapshot.forEach(snapshotForEach => {
        name=snapshotForEach.child("name").val();
        message=snapshotForEach.child("text").val();
        if (name==null || name==undefined || name == "") {
          name = "UserDeleted";
        }
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
        let text =
        `
        <div class="bluda__container-items" data-id="`+snapshotEach.child("/").key+`">
        `+snapshotEach.child("name").val()+`
        </div>
        `;
        $("#recipe-out").append(text);
      });
    })
}
function calc () {
let rad=$(".labelRad"),
    radArr = Array.from(rad);
var lastI,
    newR,
    valTarget;
var	valueRad;
var radArrI=-1;

function checkFA(th) {
	radArr.forEach((event)=>{
		radArrI++;
		valueRad=parseFloat(radArr[radArrI].getAttribute("value"));
		if (th==valueRad) {
			radArr[radArrI].click();
		} else {
//			console.log("не равны");
		}

	})
}


function newChange(th) {
  th.style.fontSize="14px";
  th.style.fontWeight="500";
  th.style.color="#56CCF2";
}
function lastChange(th) {
  rad[lastI].style.fontSize="12px";
  rad[lastI].style.fontWeight="400";
  rad[lastI].style.color="black";
}
function radMessage(F) {
//  console.log(F);
  let message = doc.querySelector(".calcMes");
  switch (F) {
    case "1.2": message.innerHTML="Физ.нагрузка отсутствует или минимальная";
      break;
    case "1.38":message.innerHTML="Умеренная активность 3 раза в неделю";
        break;
    case "1.46":message.innerHTML="Тренировки средней активности 5 раз в неделю";
          break;
    case "1.55":message.innerHTML="Интенсивные тренировки 5 раз в неделю";
          break;
    case "1.64":message.innerHTML="Каждодневные тренировки";
          break;
     case "1.73":message.innerHTML="Интенсивные тренировки каждый день";
          break;
     case "1.9":message.innerHTML="Ежедневная физ.нагрузка + физическая работа";
          break;
  }
}
rad.bind("click",(event)=>{
      let target = event.target,
          targetJQ = $(event.target),
          index =radArr.indexOf(target),
          radio = rad[index];
      newChange(radio);
      valTarget =targetJQ.attr("value");
      radMessage(valTarget);
      if (newR==null || newR==undefined) {
        lastI=index;
      }
      newR=index;
      if (lastI!=newR) {
        lastChange(rad[lastI]);
        lastI=newR;
				let changeFa=radio.getAttribute("value");
				rt.ref("Users/" + userUID).update({
					fA:changeFa
				})
      }
});
}
