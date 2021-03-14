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

// модальные окна
// document.querySelector("#modal-recipeAdd").addEventListener("click",(e)=>{
// 	e.preventDefault();
// 	let container = `
// 	<span class="modal_recipe-wrapper">
// 		<span class="modal__title">Добавить рецепт</span>
// 	<form class="recipeAdd">
// 		<label for="" class="modal__recipe">Имя рецепта</label>
// 		<input type="text" class="input__modal" id="modal-recipe_name">
// 		<label for="" class="modal__recipe">Рецепт приготовления</label>
// 		<textarea name="name" rows="8" cols="80" id="modal-recipe_sostav"></textarea>
// 		<label for="" class="modal__recipe">Продукты</label>
// 		<input type="text" class="input__modal"  id="modal-recipe_products">
// 		<label for="" class="modal__recipe">Кол-во калорий</label>
// 		<input type="text" class="input__modal"  id="modal-recipe_cal">
// 		<input type="button" class="btn_modal" value="Добавить">
// 	</form>
// 	</span>
// 	`;
// 	document.querySelector(".modal__container").inerHTML=container;
// 	let date = new Date();
// 	document.querySelector("#modal").style.display="flex";
// 	document.querySelector(".btn_modal").addEventListener("click",(e)=>{
// 		e.preventDefault();
// 		let name=document.querySelector("#modal-recipe_name").val,
// 				recipe=document.querySelector("#modal-recipe_sostav").val,
// 				cal=document.querySelector("#modal-recipe_products").val,
// 				products=document.querySelector("#modal-recipe_cal").val;
// 	})
// });
$("#modal-callback").bind("click",()=>{

});
$("#modal-settings").bind("click",()=>{

});
