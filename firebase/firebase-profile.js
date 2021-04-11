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
      $("#user-name").text(snapshot.val().name);
      $("#user-email").text(snapshot.val().email);
      $("#user-birth").text(snapshot.val().day + "." +snapshot.val().month +"." +snapshot.val().year);
      let date = new Date();
      let month =(date.getMonth()-parseFloat(snapshot.val().month))*-1/12;
      let age=Math.round(date.getFullYear()- month - snapshot.val().year);

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
// чат
function chat() {
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
  let message = document.querySelector(".calcMes");
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
document.querySelector(".modal__background").addEventListener("click",()=>{closeModalWindowResolve()});

//
//
//
//
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
//
//
//
//
//
$("#modal-callback").bind("click",(e)=>{
    callback();
    document.querySelector(".modal__background").addEventListener("click",()=>{closeModalWindowResolve()});
});
$("#modal-settings").bind("click",()=>{
  settings();
  document.querySelector(".modal__background1").addEventListener("click",()=>{closeModalWindowResolve()});
});

function closeModalWindowResolve() {
   document.querySelector(".setting__container").innerHTML="";
   document.querySelector("#modal_settings").style.display="none";
   document.querySelector(".modal__container").innerHTML="";
   document.querySelector("#modal").style.display="none";
}
}
// callback
function callback(e) {
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
  document.querySelector(".modal__background").addEventListener("click",()=>{closeModalWindowResolve()});
  document.querySelector(".btn_modal-callback").addEventListener("click",(e)=>{
    e.preventDefault();
    var thema=$("#modal-callback_thema").val(),
        description=$("#modal-callback_description").val();
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
}
// settings
function settings() {
    document.querySelector("#modal_settings").style.display="flex";
    let container = `
    <div class="setting__container-title">Настройки</div>
    <div class="settings">
      <span class="settings__block">
        <span class="settings__block-helpWrapper">
          <span class="helpWrapper-title">Аккаунт</span>
        <span class="settings__block-wrapper">
          Имя:
          <span class="settings__block_wrapper-name" id="setName"></span>
          <span class="settings__block_wrapper-nameChange" id="settingsName">
              <svg width="48" class="settings_icons" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 16 16">
              <path d="m47.772,19.851c-.462-1.119-1.56-1.851-2.772-1.851h-3v-3c0-4.971-4.029-9-9-9h-18c-4.065,0-7.464,2.715-8.577,6.42 .828-.249 1.686-.42 2.577-.42 1.362,0 2.667,.333 3.861,.903 .546-.555 1.299-.903 2.139-.903h18c1.659,0 3,1.344 3,3v3h-3c-1.212,0-2.31,.732-2.772,1.851-.462,1.122-.207,2.412 .651,3.27l6,6c.585,.585 1.353,.879 2.121,.879s1.536-.294 2.121-.879l6-6c.858-.858 1.116-2.148 .651-3.27zm-12.633,15.246c-.546,.555-1.299,.903-2.139,.903h-18c-1.656,0-3-1.341-3-3v-3h3c1.212,0 2.31-.732 2.772-1.851 .465-1.122 .207-2.412-.651-3.27l-6-6c-.585-.585-1.353-.879-2.121-.879s-1.536,.294-2.121,.879l-6,6c-.858,.858-1.113,2.148-.651,3.27 .462,1.119 1.56,1.851 2.772,1.851h3v3c0,4.971 4.029,9 9,9h18c4.068,0 7.464-2.715 8.577-6.42-.828,.249-1.686,.42-2.577,.42-1.362,0-2.667-.33-3.861-.903z"/>
              </svg>
          </span>
          <form class="settings__block-wrapperChange" id="changeName">
            <input type="text" class="input__settings" id="newName" value="" placeholder="">
            <input type="submit" class="btnSettingsChange" value="Сменить">
          </form>
        </span>
        <span class="settings__block-wrapper">
          Пол:
          <span class="settings__block_wrapper-name" id="setSex"></span>
          <span class="settings__block_wrapper-nameChange" id="settingsSex">
              <svg width="48" class="settings_icons" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 16 16">
              <path d="m47.772,19.851c-.462-1.119-1.56-1.851-2.772-1.851h-3v-3c0-4.971-4.029-9-9-9h-18c-4.065,0-7.464,2.715-8.577,6.42 .828-.249 1.686-.42 2.577-.42 1.362,0 2.667,.333 3.861,.903 .546-.555 1.299-.903 2.139-.903h18c1.659,0 3,1.344 3,3v3h-3c-1.212,0-2.31,.732-2.772,1.851-.462,1.122-.207,2.412 .651,3.27l6,6c.585,.585 1.353,.879 2.121,.879s1.536-.294 2.121-.879l6-6c.858-.858 1.116-2.148 .651-3.27zm-12.633,15.246c-.546,.555-1.299,.903-2.139,.903h-18c-1.656,0-3-1.341-3-3v-3h3c1.212,0 2.31-.732 2.772-1.851 .465-1.122 .207-2.412-.651-3.27l-6-6c-.585-.585-1.353-.879-2.121-.879s-1.536,.294-2.121,.879l-6,6c-.858,.858-1.113,2.148-.651,3.27 .462,1.119 1.56,1.851 2.772,1.851h3v3c0,4.971 4.029,9 9,9h18c4.068,0 7.464-2.715 8.577-6.42-.828,.249-1.686,.42-2.577,.42-1.362,0-2.667-.33-3.861-.903z"/>
              </svg>
          </span>
          <form class="settings__block-wrapperChange" id="changeSex">
            <select id="newSex">
              <option value="Male">Мужской</option>
              <option value="Female">Женский</option>
            </select>
            <input type="submit" class="btnSettingsChange" value="Сменить">
          </form>
        </span>
        <span class="settings__block-wrapper">
          Вес:
          <span class="settings__block_wrapper-name" id="setWeight"></span>
          <span class="settings__block_wrapper-nameChange" id="settingsWeight">
              <svg width="48" class="settings_icons" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 16 16">
              <path d="m47.772,19.851c-.462-1.119-1.56-1.851-2.772-1.851h-3v-3c0-4.971-4.029-9-9-9h-18c-4.065,0-7.464,2.715-8.577,6.42 .828-.249 1.686-.42 2.577-.42 1.362,0 2.667,.333 3.861,.903 .546-.555 1.299-.903 2.139-.903h18c1.659,0 3,1.344 3,3v3h-3c-1.212,0-2.31,.732-2.772,1.851-.462,1.122-.207,2.412 .651,3.27l6,6c.585,.585 1.353,.879 2.121,.879s1.536-.294 2.121-.879l6-6c.858-.858 1.116-2.148 .651-3.27zm-12.633,15.246c-.546,.555-1.299,.903-2.139,.903h-18c-1.656,0-3-1.341-3-3v-3h3c1.212,0 2.31-.732 2.772-1.851 .465-1.122 .207-2.412-.651-3.27l-6-6c-.585-.585-1.353-.879-2.121-.879s-1.536,.294-2.121,.879l-6,6c-.858,.858-1.113,2.148-.651,3.27 .462,1.119 1.56,1.851 2.772,1.851h3v3c0,4.971 4.029,9 9,9h18c4.068,0 7.464-2.715 8.577-6.42-.828,.249-1.686,.42-2.577,.42-1.362,0-2.667-.33-3.861-.903z"/>
              </svg>
          </span>
          <form class="settings__block-wrapperChange" id="changeWeight">
            <input type="text" class="input__settings" id="newWeight" value="" placeholder="">
            <input type="submit" class="btnSettingsChange" value="Сменить">
          </form>
        </span>
        <span class="settings__block-wrapper">
          Рост:
          <span class="settings__block_wrapper-name" id="setHeight"></span>
          <span class="settings__block_wrapper-nameChange" id="settingsHeight">
              <svg width="48" class="settings_icons" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 16 16">
              <path d="m47.772,19.851c-.462-1.119-1.56-1.851-2.772-1.851h-3v-3c0-4.971-4.029-9-9-9h-18c-4.065,0-7.464,2.715-8.577,6.42 .828-.249 1.686-.42 2.577-.42 1.362,0 2.667,.333 3.861,.903 .546-.555 1.299-.903 2.139-.903h18c1.659,0 3,1.344 3,3v3h-3c-1.212,0-2.31,.732-2.772,1.851-.462,1.122-.207,2.412 .651,3.27l6,6c.585,.585 1.353,.879 2.121,.879s1.536-.294 2.121-.879l6-6c.858-.858 1.116-2.148 .651-3.27zm-12.633,15.246c-.546,.555-1.299,.903-2.139,.903h-18c-1.656,0-3-1.341-3-3v-3h3c1.212,0 2.31-.732 2.772-1.851 .465-1.122 .207-2.412-.651-3.27l-6-6c-.585-.585-1.353-.879-2.121-.879s-1.536,.294-2.121,.879l-6,6c-.858,.858-1.113,2.148-.651,3.27 .462,1.119 1.56,1.851 2.772,1.851h3v3c0,4.971 4.029,9 9,9h18c4.068,0 7.464-2.715 8.577-6.42-.828,.249-1.686,.42-2.577,.42-1.362,0-2.667-.33-3.861-.903z"/>
              </svg>
          </span>
          <form class="settings__block-wrapperChange" id="changeHeight">
            <input type="text" class="input__settings" id="newHeight" value="" placeholder="">
            <input type="submit" class="btnSettingsChange" value="Сменить">
          </form>
        </span>
        <span class="settings__block-wrapper">
          Рождение:
          <span class="settings__block_wrapper-name" id="setBirth"></span>
          <span class="settings__block_wrapper-nameChange" id="settingsBirth">
              <svg width="48" class="settings_icons" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 16 16">
              <path d="m47.772,19.851c-.462-1.119-1.56-1.851-2.772-1.851h-3v-3c0-4.971-4.029-9-9-9h-18c-4.065,0-7.464,2.715-8.577,6.42 .828-.249 1.686-.42 2.577-.42 1.362,0 2.667,.333 3.861,.903 .546-.555 1.299-.903 2.139-.903h18c1.659,0 3,1.344 3,3v3h-3c-1.212,0-2.31,.732-2.772,1.851-.462,1.122-.207,2.412 .651,3.27l6,6c.585,.585 1.353,.879 2.121,.879s1.536-.294 2.121-.879l6-6c.858-.858 1.116-2.148 .651-3.27zm-12.633,15.246c-.546,.555-1.299,.903-2.139,.903h-18c-1.656,0-3-1.341-3-3v-3h3c1.212,0 2.31-.732 2.772-1.851 .465-1.122 .207-2.412-.651-3.27l-6-6c-.585-.585-1.353-.879-2.121-.879s-1.536,.294-2.121,.879l-6,6c-.858,.858-1.113,2.148-.651,3.27 .462,1.119 1.56,1.851 2.772,1.851h3v3c0,4.971 4.029,9 9,9h18c4.068,0 7.464-2.715 8.577-6.42-.828,.249-1.686,.42-2.577,.42-1.362,0-2.667-.33-3.861-.903z"/>
              </svg>
          </span>
          <form class="settings__block-wrapperChange" id="changeBirth">
            <span class="age" id="ageBirth">
              <select class="day" id="day" name="day">
              </select>
              <select class="month" id="month" name="month">
              </select>
              <select class="year" id="year" name="year">
              </select>
            </span>
            <input type="submit" class="btnSettingsChange" value="Сменить">
          </form>
        </span>
      </span>
      </span>
    </div>
    `;
    document.querySelector(".setting__container").innerHTML=container;
    rt.ref("Users/"+userUID).on("value",snapshot=>{
        document.querySelector("#setName").innerHTML=snapshot.val().name;
        let gender = snapshot.val().gender;
        if (gender=="Male") {
          document.querySelector("#setSex").innerHTML="Мужской";
        }
        if (gender=="Female") {
          document.querySelector("#setSex").innerHTML="Женский";
        }
        document.querySelector("#setWeight").innerHTML=snapshot.val().weight;
        document.querySelector("#setHeight").innerHTML=snapshot.val().height;
        document.querySelector("#setBirth").innerHTML=snapshot.val().day + "." +snapshot.val().month +"." +snapshot.val().year;
    });
    // Имя
    document.querySelector("#settingsName").addEventListener("click",()=>{
      document.querySelector("#changeName").style.display="flex";
      document.querySelector(".settings__block_wrapper-name").style.display="none";
      document.querySelector(".settings__block_wrapper-nameChange").style.display="none";
      document.querySelector("#changeName").addEventListener("submit",e=>{
        e.preventDefault();
        let name = document.querySelector("#newName");
        if (name.value=="") {
          document.querySelector("#changeName").style.display="none";
          document.querySelector(".settings__block_wrapper-name").style.display="flex";
          document.querySelector(".settings__block_wrapper-nameChange").style.display="flex";
          return;
        }
        rt.ref("Users/"+userUID).update({
          name: name.value
        }).then(()=>{
          name.value="";
          document.querySelector("#changeName").style.display="none";
          document.querySelector(".settings__block_wrapper-name").style.display="flex";
          document.querySelector(".settings__block_wrapper-nameChange").style.display="flex";
        });});});
        // Пол
        document.querySelector("#settingsSex").addEventListener("click",()=>{
          document.querySelector("#changeSex").style.display="flex";
          document.querySelector("#setSex").style.display="none";
          document.querySelector("#settingsSex").style.display="none";
          document.querySelector("#changeSex").addEventListener("submit",e=>{
            e.preventDefault();
            let newSex = document.querySelector("#newSex");
            rt.ref("Users/"+userUID).update({
              gender: newSex.value
            }).then(()=>{
              name.value="";
              document.querySelector("#changeSex").style.display="none";
              document.querySelector("#setSex").style.display="flex";
              document.querySelector("#settingsSex").style.display="flex";
            });});});
            // Вес
            document.querySelector("#settingsWeight").addEventListener("click",()=>{
              document.querySelector("#changeWeight").style.display="flex";
              document.querySelector("#setWeight").style.display="none";
              document.querySelector("#settingsWeight").style.display="none";
              document.querySelector("#changeWeight").addEventListener("submit",e=>{
                e.preventDefault();
                let newWeight = document.querySelector("#newWeight");
                rt.ref("Users/"+userUID).update({
                  weight: newWeight.value
                }).then(()=>{
                  name.value="";
                  document.querySelector("#changeWeight").style.display="none";
                  document.querySelector("#setWeight").style.display="flex";
                  document.querySelector("#settingsWeight").style.display="flex";
                });});});
            // Рост
            document.querySelector("#settingsHeight").addEventListener("click",()=>{
              document.querySelector("#changeHeight").style.display="flex";
              document.querySelector("#setHeight").style.display="none";
              document.querySelector("#settingsHeight").style.display="none";
              document.querySelector("#changeHeight").addEventListener("submit",e=>{
                e.preventDefault();
                let newHeight = document.querySelector("#newHeight");
                rt.ref("Users/"+userUID).update({
                  height: newHeight.value
                }).then(()=>{
                  name.value="";
                  document.querySelector("#changeHeight").style.display="none";
                  document.querySelector("#setHeight").style.display="flex";
                  document.querySelector("#settingsHeight").style.display="flex";
                });});});
                // Рождение
                document.querySelector("#settingsBirth").addEventListener("click",()=>{
                  changeBirth();
                  document.querySelector("#changeBirth").style.display="flex";
                  document.querySelector("#setBirth").style.display="none";
                  document.querySelector("#settingsBirth").style.display="none";
                  document.querySelector("#changeBirth").addEventListener("submit",e=>{
                    e.preventDefault();
                    let setBirth = document.querySelector("#setBirth");
                    rt.ref("Users/"+userUID).update({
                      day: document.querySelector("#day").value,
                      month: document.querySelector("#month").value,
                      year: document.querySelector("#year").value
                    }).then(()=>{
                      name.value="";
                      document.querySelector("#changeBirth").style.display="none";
                      document.querySelector("#setBirth").style.display="flex";
                      document.querySelector("#settingsBirth").style.display="flex";
                    });});});
                    function changeBirth() {
                      for (var i=1;i<32;i++) {
                        let option = document.createElement("option");
                        option.setAttribute("value",i);
                        option.innerHTML=i;
                        $(".day").append(option);
                    //    console.log(option)
                      }
                      for (var i=1;i<13;i++) {
                        let option = document.createElement("option");
                        option.setAttribute("value",i);
                        option.innerHTML=i;
                        $(".month").append(option);
                    //    console.log(option)
                      }
                      for (var i=1930;i<2022;i++) {
                        let option = document.createElement("option");
                        option.setAttribute("value",i);
                        option.innerHTML=i;
                        $(".year").append(option);
                    //    console.log(option)
                      }
                    }

}
