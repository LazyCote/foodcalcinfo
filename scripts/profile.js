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
$(".chatAll").bind("click",chatAll);
$(".chatRegion").bind("click",chatRegion);
$(".recipe").bind("click",recipe);
$(".calories").bind("click",calories);
$(".foodTheree").bind("click",foodTheree);

function chatAll() {
// установить соединение с сервером

//видоизменить блок container__down_block-header

//вывести информацию в блок
}
function chatRegion() {

}
function recipe() {

}
function calories() {

}
function foodTheree() {

}
