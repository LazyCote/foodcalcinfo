document.querySelector(".logout").addEventListener("submit",(e)=>{
  console.log("try out");
  auth.signOut().then(cred=>{
    console.log(cred.user);
  })
})
