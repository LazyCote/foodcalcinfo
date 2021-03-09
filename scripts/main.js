var doc=document,
    wiw=window;
var scripts =$("script[src]"),
    link =$("link[href]"),
    a =$("a[href]"),
    body = $("body");
var inputScripts = [
    "*/scripts/main__firstlvl.js"
    ];



$("document").ready(()=>{
    regAuthForm();
})

wiw.addEventListener("scroll",(event)=>{
  let scroll = wiw.scrollY;
  if (scroll>=500) {
    $(".header").css("position","fixed");
  } else {
    $(".header").css("position","");
  }
})
for (var i=0;i<scripts.length;i++) {
    if (scripts[i].getAttribute("src").includes("*")==true) {
      scripts[i].setAttribute("src",scripts[i].getAttribute("src").replace("*","https://lazycote.github.io"));
    }
  }
for (var i=0;i<link.length;i++) {
  if (link[i].getAttribute("href").includes("*")==true) {
    link[i].setAttribute("href",link[i].getAttribute("href").replace("*","https://lazycote.github.io"));
  }
}
for (var i=0;i<a.length;i++) {
  if (a[i].getAttribute("href").includes("*")==true) {
    a[i].setAttribute("href",a[i].getAttribute("href").replace("*","https://lazycote.github.io"));
  }
}
  for (var i=0;i<inputScripts.length;i++) {
    let change;
    if (inputScripts[i].includes("*")==true) {
      let script = doc.createElement('script');
      change=inputScripts[i].replace("*","https://lazycote.github.io");
      script.src=change;
      body.append(script);
    } else {
      let script = doc.createElement('script');
      change=inputScripts[i];
      script.src=change;
      body.append(script);
    }
  }
function regAuthForm() {
  for (var i=1;i<32;i++) {
    let option = doc.createElement("option");
    option.setAttribute("value",i);
    option.innerHTML=i;
    $(".day").append(option);
//    console.log(option)
  }
  for (var i=1;i<13;i++) {
    let option = doc.createElement("option");
    option.setAttribute("value",i);
    option.innerHTML=i;
    $(".month").append(option);
//    console.log(option)
  }
  for (var i=1930;i<2022;i++) {
    let option = doc.createElement("option");
    option.setAttribute("value",i);
    option.innerHTML=i;
    $(".year").append(option);
//    console.log(option)
  }
}

// ВАЛИДАЦИЯ
$(".input[name=password_try]").bind("input",()=>{
  let pass =$(".input[name=password]").val(),
      passTry= $(".input[name=password_try]").val();
  if (passTry!=pass) {
    $(".regMess").css("display","flex");
    doc.getElementById("error_description").innerHTML="пароли не совпадают";
  } else {
    $(".regMess").css("display","none");
  }
})

$("#auth").bind("click",()=>{
    $(".authForm").css("display","flex");
    $(".registerForm").css("display","none");
});
$("#reg").bind("click",()=>{
    $(".authForm").css("display","none");
    $(".registerForm").css("display","flex");
});
$(".browser").bind("click",()=>{
  $("#auth").click();
});
function calc () {
let rad=$(".labelRad"),
    radArr = Array.from(rad);
var lastI,
    newR,
    valTarget;

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
rad.bind("click",(event)=>{
      let target = event.target,
          targetJQ = $(event.target),
          index =radArr.indexOf(target),
          radio = rad[index];
      newChange(radio);
      valTarget =targetJQ.attr("value");
      if (newR==null || newR==undefined) {
        lastI=index;
      }
      newR=index;
      if (lastI!=newR) {
        lastChange(rad[lastI]);
        lastI=newR;
      }
});
$(".btn-test").bind("click",()=>{
  let weight=parseInt($("#weightF").val()),
      height=parseInt($("#heightF").val()),
      old=parseInt($("#oldF").val()),
      genderF=parseInt($("#genderf").val());
      valTarget=parseInt(valTarget);
  let gender;
  switch (genderF) {
    case 1:gender=5; break;
    case 0:gender=-161; break;
  }
  let dci = weight*10 + height*6.25-old*5+gender;
      dci = dci *valTarget
  $("#normalCalc").val(dci);
})
}
calc();
