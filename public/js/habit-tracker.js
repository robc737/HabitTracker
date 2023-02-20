const linkMap = {
  Weekly: { viewId: "weekly", url: "/weekly" },
  Monthly: { viewId: "monthly", url: "/monthly" },
  "Create Habit": { viewId: "create", url: "/create" },
  "Edit Habit": { viewId: "edit", url: "/edit" },
};

let headerLinks = document.querySelectorAll(".header a");
console.log(headerLinks);
headerLinks.forEach((headerLink) => {
  headerLink.addEventListener("click", (event) => {
    const viewObj = linkMap[event.target.innerText];
    showView(viewObj.viewId);
    window.history.pushState({}, "", viewObj.url);
  });
});

function showView(viewId) {
  let views = document.querySelectorAll(".view");
  views.forEach((view) => {
    view.classList.add("d-none");
  });

  let view = document.getElementById(viewId);
  view.classList.remove("d-none");
}

window.addEventListener("popstate", showViewByUrl);

function showViewByUrl() {
  let path = window.location.pathname;
  showView(path.slice(1));
}

showView("weekly");
window.history.pushState({}, "", "weekly");

const showView2 = () => {};
