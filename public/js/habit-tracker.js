const linkMap = {
    'Weekly' : {viewId: "weekly", url: '/weekly'},
    'Monthly' : {viewId: 'monthly', url: '/monthly'},
    'Create Habit' : {viewId: 'create', url: '/create'},
    'Edit Habit' : {viewId: 'edit', url: '/edit'}
}

let headerLinks = document.querySelectorAll(".header a");
console.log(headerLinks);
headerLinks.forEach(headerLink => {
   headerLink.addEventListener("click", (event) => {
       const viewObj = linkMap[event.target.innerText];
       console.log(viewObj.viewId);
       let view = document.getElementById(viewObj.viewId);
       console.log(view.classList);
       console.log(view.className);

       let views = document.querySelectorAll(".view");
       views.forEach( view => {
           view.classList.add("d-none");
       });

       view.classList.remove("d-none");

       window.history.pushState({}, '', viewObj.url);
   });
});

window.addEventListener("popstate", showViewByUrl);

showView();

function showViewByUrl() {
    console.log(window.location.pathname);
}

function showView(viewId) {

}

const showView2 = () => {

}