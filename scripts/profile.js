var doc=document,
	  wiw=window,
 	  viewPortH = wiw.innerHeight,
 	  viewPortW = wiw.innerWidth;
var burgerCount=0,
	  burgerCountI=0;
//Высота относительно viewport(видимой области)
function content() {
	if (matchMedia("(max-width:1920px)").matches && burgerCountI==0)
		$(".view__right_container-top").css("width","90%");
	else if (matchMedia("(max-width:1920px)").matches && burgerCountI==1)
		$(".view__right_container-top").css("width","100%");

}
// выдвижной сайдбар
$(".left__burger").bind("click",()=>{
	burgerCountI=burgerCount%2;
	burgerCount++;
	if (burgerCountI==0) {
		$(".view__left-container").css("width","200px");
		content();
		setTimeout(()=>{left__profileInfoOpen()},700);
	} else if (burgerCountI==1) {
		$(".view__left-container").css("width","70px");
		content();
		left__profileInfoClose()
	}
});
// sidebar(left menu) || left__profileInfo
function left__profileInfoOpen() {
	$(".left__profileInfo-text").css("display","flex");
	$(".left__points-title").css("display","block");
}
function left__profileInfoClose() {
	$(".left__profileInfo-text").css("display","none");
	$(".left__points-title ").css("display","none");
}

function calc () {
let rad=$(".labelRad"),
    radArr = Array.from(rad);
var lastI,
    newR,
    valTarget;
var	valueRad;
var radArrI=-1;
auth.onAuthStateChanged(user =>{
		  if (user) {
		    userUID=user.uid;
				rt.ref("Users/" + userUID).on("value",snapshot=>{
					checkFA(snapshot.val().fA);
				});

		  } else {
				calc();
		  }
});
function checkFA(th) {
	radArr.forEach((event)=>{
		radArrI++;
		valueRad=parseFloat(radArr[radArrI].getAttribute("value"));
		if (th==valueRad) {
//			console.log("равны");
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
calc();
