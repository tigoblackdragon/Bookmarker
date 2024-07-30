document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("st-nam").addEventListener("keyup", nInpVald);
  document.getElementById("sit-url").addEventListener("keyup", urlInpVald);
  document.addEventListener("keyup", subButAct);
  document.getElementById("sub").addEventListener("click", subData);
  // var deleteBtns = document.querySelectorAll("#del");
  // if (deleteBtns) {
  //   for (var j = 0; j < deleteBtns.length; j++) {
  //     deleteBtns[j].addEventListener("click", function (e) {
  //       deleteUrl(e);
  //     });
  //   }
  // }
});
subButAct();
displayBookmark();

var nVald;
function nInpVald() {
  nVald = /^(?=.*[a-zA-Z]{2,}|.*\d{2,})[a-zA-Z0-9]+$/.test(document.getElementById("st-nam").value);
  console.log(nVald);
  if (nVald) {
    document.getElementById("st-nam").classList.remove("inv-inp");
    document.getElementById("st-nam").classList.add("cor-inp");
    document.querySelector(".sit-grp .fa-check").classList.replace("d-none", "d-block");
    document.querySelector(".sit-grp .fa-exclamation").classList.replace("d-block", "d-none");
    document.querySelector(".sit-grp h3").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("st-nam").classList.add("inv-inp");
    document.getElementById("st-nam").classList.remove("cor-inp");
    document.querySelector(".sit-grp .fa-exclamation").classList.replace("d-none", "d-block");
    document.querySelector(".sit-grp .fa-check").classList.replace("d-block", "d-none");
    document.querySelector(".sit-grp h3").classList.replace("d-none", "d-block");
  }
}
var urlVald;
function urlInpVald() {
  urlVald =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(document.getElementById("sit-url").value);
  if (urlVald) {
    document.getElementById("sit-url").classList.remove("inv-inp");
    document.getElementById("sit-url").classList.add("cor-inp");
    document.querySelector(".url-grp .fa-check").classList.replace("d-none", "d-block");
    document.querySelector(".url-grp .fa-exclamation").classList.replace("d-block", "d-none");
    document.querySelector(".url-grp h3").classList.replace("d-block", "d-none");
    console.log(urlVald);
  } else {
    document.getElementById("sit-url").classList.add("inv-inp");
    document.getElementById("sit-url").classList.remove("cor-inp");
    document.querySelector(".url-grp .fa-exclamation").classList.replace("d-none", "d-block");
    document.querySelector(".url-grp .fa-check").classList.replace("d-block", "d-none");
    document.querySelector(".url-grp h3").classList.replace("d-none", "d-block");
  }
}
function subButAct() {
  console.log(urlVald);
  console.log(nVald);
  if (urlVald == true && nVald == true) {
    document.getElementById("sub").disabled = false;
  }

  else {
    document.getElementById("sub").disabled = true;
  }
}
var pack;
var index;
var bookmarks;
function subData() {
  var httpsRegex = /^https?:\/\//;
  var urlVald = httpsRegex.test(document.getElementById("sit-url").value);
  if (urlVald){
    var bookmark = {
    stNam: document.getElementById("st-nam").value,
    urlNam: document.getElementById("sit-url").value};
  }

  else{
    var bookmark = {
      stNam: document.getElementById("st-nam").value,
       urlNam:`https://${document.getElementById("sit-url").value}`
    };
    }
  bookmarks.push(bookmark);
  index=bookmarks.length+1;
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  console.log(bookmarks);
  displayBookmark();
}

function displayBookmark() {
  pack = "";
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList")) || [];
  
  for (var i = 0; i < bookmarks.length; i++) {
    pack +=`<div class="row w-100 bg-white pt-1 brd-btm pb-1">
    <div class="con d-flex flex-row justify-content-between align-items-center">
      <div class="col-3"><h4>${i + 1}</h4></div>
      <div class="col-3"><h4>${bookmarks[i].stNam}</h4></div>
      <div class="col-3 d-flex me-1"><a href="${bookmarks[i].urlNam}" class="btn btn-vis btn-danger ms-auto me-auto"><i class="fas fa-eye pe-2"></i>Visit</a></div>
      <div class="col-3 d-flex" ><h3 data-index="${i}" id="del"  class="btn btn-del btn-danger ms-auto me-auto"><i class="fas fa-trash-can pe-2"></i>Delete</h3></div>
    </div>
  </div>`;
document.querySelector(".crt").innerHTML = pack;
document.getElementById("st-nam").value = null;
document.getElementById("sit-url").value = null;
document.getElementById("st-nam").classList.remove("inv-inp", "cor-inp");
document.getElementById("sit-url").classList.remove("inv-inp", "cor-inp");
document.querySelector(".sit-grp .fa-check").classList.replace("d-block", "d-none");
document.querySelector(".url-grp .fa-check").classList.replace("d-block", "d-none");
document.getElementById("sub").disabled = true;
var deleteBtns = document.querySelectorAll("#del");
  if (deleteBtns) {
    for (var j = 0; j < deleteBtns.length; j++) {
      deleteBtns[j].addEventListener("click", function (e) {
        deleteUrl(e);
      });
    }
  }
  }};

  function deleteUrl(x){
    var x;
    console.log(x);
    var deletedIndex = x.target.dataset.index;
    deletedIndex = parseInt(deletedIndex);
    bookmarks.splice(deletedIndex, 1);
    console.log(deletedIndex);
    console.log(bookmarks);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    if(bookmarks.length>0){
      displayBookmark();
    }
    else {
      document.querySelector(".crt").innerHTML = "";
      localStorage.removeItem("bookmarksList");
    }
  };

