var doc=document,
	  wiw=window,
 	  viewPortH = wiw.innerHeight,
 	  viewPortW = wiw.innerWidth;
var burgerCount=0,
	  burgerCountI=0;
//Высота относительно viewport(видимой области)
$(".view").css("height",viewPortH);
function content() {
	if (matchMedia("(max-width:1920px)").matches && burgerCountI==0)
		content1080Close();
	else if (matchMedia("(max-width:1920px)").matches && burgerCountI==1)
		content1080Open();

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
// content event
function content1080Close () {
	$(".view__right_container-top").css("width","90%");
	$(".view__right_container-down").css("width","90%");
}
function content1080Open () {
	$(".view__right_container-top").css("width","100%");
	$(".view__right_container-down").css("width","100%");
}
// sidebar(left menu) || left__profileInfo
function left__profileInfoOpen() {
	$(".left__profileInfo-text").css("display","flex");
	$(".left__points-title").css("display","block");
}
function left__profileInfoClose() {
	$(".left__profileInfo-text").css("display","none");
	$(".left__points-title ").css("display","none");
}

// event at click points of menu
// индекс меню
function functionName(th) {
	th.bind("click",(event)=>{
		let target = event.target;
		let arrayBlock=Array.from(th),
				index=arrayBlock.indexOf(target);
				console.log(index)
		checkMenuPoints(index);
	});
}
// Блоки меню
functionName($(".right__container_block-header"));
functionName($(".block__header-title"));
functionName($(".block__header-img"));
//
function checkMenuPoints(th) {
	switch (th) {
		case 0:
		closeWindowMenu("chatAll");
			break;
		case 1:
		closeWindowMenu("chatRegion");
			break;
		case 2:
		closeWindowMenu("recipe");
			break;
		case 3:
		closeWindowMenu(th)
			break;
		case 4:
		closeWindowMenu(th)
			break;
		default:
	}
}
function closeWindowMenu(th) {
$(".chatRegion").css("display","none");
$(".chatAll").css("display","none");
$(".recipe").css("display","none");

$(".right_container_down-block").css("height","100%");
$(".container__down_block-header").css("display","none");
$("."+th+"__container-chat").css("height",parseInt($(".right_container_down-block").css("height"))-100);
$("."+th+"").css("display","flex");
}
function connectDataBase(th) {

}
// отправка сообщения
function toSend() {
	$("#chattAllBtn").bind("click",()=>{
	var user = "s2d1ent",
			message=$(".chattAllMessage").val();
			if (message=="") {
				return;
			}
			if (user==$(".messageChatAllBlock-name").val()) {
				$(".messageChatAllBlock").classList.add(".myMessageM");
			}
	var text = `<div class="messageChatAllBlock" user-data="">
		<span class="messageChatAllBlock-name">`+user+`</span>
		<span class="messageChatAllBlock-mess">`+message+`</span>
	</div>`;
	$(".chatAll__container-chat").append(text);
	});
	$("#chattRegionBtn").bind("click",()=>{
	var user = "s2d1ent",
			message=$(".chattRegionMessage").val();
			if (message=="") {
				return;
			}
			if (user==$(".messageChatRegionBlock-name").val()) {
				$(".messageChatRegionBlock").classList.add(".myMessageM");
			}
	var text = `<div class="messageChatRegionBlock" user-data="">
		<span class="messageChatRegionBlock-name">`+user+`</span>
		<span class="messageChatRegionBlock-mess">`+message+`</span>
	</div>`;
	$(".chatRegion__container-chat").append(text);
	});
	$(".chattRegionMessage").val("");
}
toSend();
