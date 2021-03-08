var doc=document,
	wiw=window;
var copywrite=doc.querySelector(".footer__container__watermark-title");
	copywrite.innerHTML="©s2d1ent - 2021";
var i=0,
	b=0;
doc.querySelectorAll(".footer__container__menu-li")[3].setAttribute("href","https://lazycote.github.io/");

if (doc.querySelector(".burger")!=undefined || doc.querySelector(".burger")!=null) {
	doc.querySelector(".burger").addEventListener("click",()=>{
		b=i%2;
		if (b==0) {
			doc.querySelector(".menu__drop").style.display="block";
			doc.querySelector(".burger").style.fill="#FFDF00";
			i++;
		} else if (b==1) {
			doc.querySelector(".menu__drop").style.display="none";
			doc.querySelector(".burger").style.fill="#fff";
			i++;
		}
	})
}


$("head").prepend('<script data-ad-client="ca-pub-6725342082633367" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
