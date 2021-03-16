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

      calloriesStats(parseFloat(snapshot.val().height),parseFloat(snapshot.val().weight),snapshot.val().gender,age,parseFloat(snapshot.val().fA));
    });
    calc();
    modalWondow();
    recipeout();
    chat();
  } else {
    setTimeout(()=>{console.log("рекурсия");Main();},2000)
  }
}
function chat() {
//   rt.ref("Message/").once("value",snapshot=>{
//     let name = "",
//         message="";
//       snapshot.forEach(snapshotForEach => {
//         name=snapshotForEach.child("name").val();
//         message=snapshotForEach.child("text").val();
//         if (name==null || name==undefined || name == "") {
//           name = "UserDeleted";
//         }
//     var messageIn = `<div class="messageChatAllBlock" user-data="">
//               <span class="messageChatAllBlock-name">`+name+`</span>
//               <span class="messageChatAllBlock-mess">`+message+`</span>
//             </div>`;
// document.querySelector(".chatAll__container-chat").innerHTML+=messageIn;
// document.querySelector(".chatAll__container-chat").scrollTop=document.querySelector(".chatAll__container-chat").scrollHeight;
//       });
//   })
  rt.ref("Message/").on("value",snapshot=>{
    document.querySelector(".chatAll__container-chat").innerHTML="";
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
function recipeout() {
    rt.ref("Recipe/").on("value",snapshot=>{
      document.getElementById("recipe-out").innerHTML="";
      snapshot.forEach(snapshotEach => {
        let text =
        `
        <a class="bluda__container-items" target="_blank" href="`+`reciperead.html#`+snapshotEach.child("/").key+`">
        `+snapshotEach.child("name").val()+`
        </a>
        `;
        $("#recipe-out").append(text);
        recipeEvent();
      });
    })
}
//recipe event
function recipeEvent(event) {
  let recipe = $(".bluda__container-items");
  let recipeArr=Array.from(recipe);
  recipe.bind("click",(event)=>{
    let index = recipeArr.indexOf(event.target);
    let recipeId = recipeArr[index].getAttribute("data-id");
    readRicept(recipeId);
  })
  function readRicept(th) {
    let url="reciperead.html" + "#" + th;
    console.log(url)
    window.open=url;
  }
}
//calc
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

function modalWondow () {
  document.querySelector(".modal__background").addEventListener("click",()=>{
  		document.querySelector(".modal__container").innerHTML="";
  			document.querySelector("#modal").style.display="none";
  });

  document.querySelector("#modal-recipeAdd").addEventListener("click",(e)=>{
  	e.preventDefault();
    let error = false;
  	let container = `
  	<span class="modal_recipe-wrapper">
  		<span class="modal__title">Добавить рецепт</span>
  	<form class="recipeAdd">
  		<label for="" class="modal__recipe">*Имя рецепта</label>
  		<input type="text" class="input__modal" value="" id="modal-recipe_name">
  		<label for="" class="modal__recipe">*Рецепт приготовления</label>
  		<textarea name="name" rows="8" cols="80" value="" id="modal-recipe_sostav"></textarea>
  		<label for="" class="modal__recipe">Продукты</label>
  		<input type="text" class="input__modal"  value="" id="modal-recipe_products">
  		<label for="" class="modal__recipe">Кол-во калорий</label>
  		<input type="text" class="input__modal" value=""  id="modal-recipe_cal" placeholder="243">
      <span class="modal__errorMesage"><span class="modal__errorMesage-title"></span></span>
  		<input type="button" class="btn_modal" value="Добавить">
  	</form>
  	</span>
  	`;
  	document.querySelector(".modal__container").innerHTML=container;
  	let date = new Date();
    let hash = date.getTime() + userUID;
    error = false;
    let  errorMes="";
        console.log(error)
  	document.querySelector("#modal").style.display="flex";
  	document.querySelector(".btn_modal").addEventListener("click",(e)=>{
  		e.preventDefault();
  		var name=$("#modal-recipe_name").val(),
  				recipe=$("#modal-recipe_sostav").val(),
  				cal=$("#modal-recipe_cal").val(),
  				products=$("#modal-recipe_products").val();
          // тесты
          if(name.includes("<")==true) {
            name=name.replace(/</g,"");
          }
          if(name.includes(">")==true) {
            name=name.replace(/>/g,"");
          }
          if(recipe.includes("<")==true) {
            recipe=recipe.replace(/</g,"");
          }
          if(recipe.includes(">")==true) {
            recipe=recipe.replace(/>/g,"");
          }
          if(cal.includes("<")==true) {
            cal=cal.replace(/</g,"");
          }
          if(cal.includes(">")==true) {
            cal=cal.replace(/>/g,"");
          }
          if(products.includes("<")==true) {
            products=products.replace(/</g,"");
          }
          if(products.includes(">")==true) {
            products=products.replace(/>/g,"");
          }
          if (name=="" || recipe=="") {
              error = true;
              errorMes="Не введено имя рецепта или сам рецепт";
          } else {error = false;}
          //
          cal=parseFloat(cal);
          if (error==false) {
            rt.ref("Recipe/" + hash).set({
              cal:cal ,
              name: name,
              products:products ,
              recipe:recipe
            }).then(resolve =>{
              closeModalWindowResolve();
            });
          } else {
            console.log(error)
            document.querySelector(".modal__errorMesage-title").innerHTML="Ошибка: " + errorMes;
          }
  	})
  });
  $("#modal-callback").bind("click",(e)=>{
    e.preventDefault();
    let error = false;
  	let container = `
  	<span class="modal_recipe-wrapper">
  		<span class="modal__title-callback">Обратная связь</span>
  	<form class="callback">
  		<label for="" class="modal__callback">Тема</label>
  		<input type="text" class="input__modal-callback" value="" id="modal-callback_thema">
  		<label for="" class="modal__callback">Описание</label>
  		<textarea name="name" rows="8" cols="80" value="" id="modal-callback_description"></textarea>
  		<span class="modal__errorMesage"><span class="modal__errorMesage-title"></span></span>
  		<input type="button" class="btn_modal-callback" value="Отправить">
  	</form>
  	</span>
  	`;
  	document.querySelector(".modal__container").innerHTML=container;
  	let date = new Date();
    let hash = date.getTime() + userUID;
    let dateNow = date.getDate() +"-"+date.getMonth() +"-"+date.getFullYear();
    console.log(dateNow)
    error = false;
    let  errorMes="";
  	document.querySelector("#modal").style.display="flex";
  	document.querySelector(".btn_modal-callback").addEventListener("click",(e)=>{
  		e.preventDefault();
  		var thema=$("#modal-callback_thema").val(),
  				description=$("#modal-callback_description").val();
          // тесты
          if(thema.includes("<")==true) {
            thema=thema.replace(/</g,"");
          }
          if(thema.includes(">")==true) {
            thema=thema.replace(/>/g,"");
          }
          if(description.includes("<")==true) {
            description=description.replace(/</g,"");
          }
          if(description.includes(">")==true) {
            description=description.replace(/>/g,"");
          }
          if (description=="") {
              error = true;
              errorMes="Не введено обращение к администрации";
          } else {error = false;}
          //
          if (error==false) {
            rt.ref("Callback/"+dateNow+"/"+ hash).set({
              uid:userUID ,
              thema: thema,
              description:description
            }).then(resolve =>{
              closeModalWindowResolve();
            });
          } else {
            console.log(error)
            document.querySelector(".modal__errorMesage-title").innerHTML="Ошибка: " + errorMes;
          }
  	})
  });
  $("#modal-settings").bind("click",()=>{

  });

function closeModalWindowResolve() {
  document.querySelector(".modal__container").innerHTML="";
  document.querySelector("#modal").style.display="none";
}

}
