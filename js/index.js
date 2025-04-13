//* HTML Elements
  var nameInput= document.querySelector("#bookmarkName");
  var websiteInput= document.querySelector("#websiteURL");
  var contentAdd = document.querySelector("#contentContainer");
  var searchInput = document.querySelector("#searchInput");
//^ Variables
 var submit = document.querySelector("#submitBtn")
 var websiteList=[]
 if(localStorage.getItem("websites")!==null){
    websiteList= JSON.parse(localStorage.getItem("websites"))
 }
 var deleteBtn = document.querySelector("#deleteBtn")
//& Functions'
function addWebsite(){
    if(validate(nameRegex,nameInput) && validate(websiteRegex,websiteInput)){
        var website ={
            name:nameInput.value,
            url:completeURL(websiteInput.value),
        }
        websiteList.push(website)
        localStorage.setItem("websites",JSON.stringify(websiteList))
        displayContent(websiteList.length - 1)
        clearInputs()
        Swal.fire({
            title: "BookMark Added!",
            icon: "success",
            draggable: true
          });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
    }
}
submit.addEventListener("click",function(){
    addWebsite()
})
function displayContent(index){
    var htmlContent = `
        <tr>
            <td id="indexNumber">${index+1}</td>
            <td id="siteName">${websiteList[index].name}</td>
            <td><button type="button" class="visit btn btn-success px-2" onclick="visitSite(${index})"><i class="fa fa-eye"></i> Visit</button></td>
            <td id="deleteSite"><button id="deleteBtn"  class="delete btn btn-danger px-2" onclick="deleteWebsite(${index})"><i class="fa fa-trash-can"></i> Delete</button></td>
        </tr>
    `
    contentAdd.classList.remove("d-none")
    contentAdd.innerHTML += htmlContent
}
function displayAllContent(){
        for(i=0;i<websiteList.length;i++){
            displayContent(i)
        }
}
displayAllContent()

function deleteWebsite(index){
    websiteList.splice(index,1)
    localStorage.setItem("websites",JSON.stringify(websiteList))
    contentAdd.innerHTML=""
    displayAllContent()
}
function clearInputs(){
    nameInput.value=""
    websiteInput.value=""
}
function validate(regex, element){
    if(regex.test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}
nameInput.addEventListener("input",function(){
    validate(nameRegex,nameInput)
})
websiteInput.addEventListener("input",function(){
    validate(websiteRegex,websiteInput)
})
function searchBookmark(){
    contentAdd.innerHTML=""
    for(i=0;i<websiteList.length;i++){
        if(websiteList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            displayContent(i)
        }
    } 
}
searchInput.addEventListener("input",function(){
    searchBookmark()
})
function completeURL(url) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    } else {
        return "https://" + url.replace(/^www\./, "");
    }
}

function visitSite(index){
    var url=websiteList[index].url
    window.open(url,"_blank")
}

//*Regex
var nameRegex = /^([A-Za-z]{3,})(\s+[A-Za-z0-9_]{2,})*$/;
var websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
