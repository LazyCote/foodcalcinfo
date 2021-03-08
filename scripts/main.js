var doc=document,
    wiw=window;
var scripts =$("script[src]"),
    link =$("link[href]"),
    a =$("a[href]"),
    body = $("body");

var inputScripts = [
"*/scripts/main__firstlvl.js"
];
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
    }
  }
