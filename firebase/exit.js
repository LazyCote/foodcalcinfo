var logOut = document.querySelector("#logout");
logOut.addEventListener("click", (e)=>{
  e.preventDefault();
  auth.signOut().then(()=>{
    console.log("out");
  })
})
