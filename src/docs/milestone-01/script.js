function collapse(e) {
  let id = e.target.id.split("-")[1];
  e.target.classList.toggle("active");

  let description = document.getElementById("description-" + id);
  description.classList.toggle("hidden");

  let arrow = document.getElementById("arrow-" + id);
  arrow.innerHTML = arrow.innerHTML == "▴" ? "▾" : "▴";

  // check if all are expanded
  let descriptions = document.getElementsByClassName("description");
  let allExpanded = true;

  for (let i = 0; i < descriptions.length; i++) {
    if (descriptions[i].classList.contains("hidden")) {
      allExpanded = false;
      break;
    }
  }

  document.getElementById("expand").innerHTML = allExpanded
    ? "Collapse All"
    : "Expand All";
}

function openAll() {
  let btn = document.getElementById("expand");
  let descriptions = document.getElementsByClassName("description");
  let collapsibles = document.getElementsByClassName("collapsible");
  let arrows = document.getElementsByClassName("arrow");

  if (btn.innerHTML == "Expand All") {
    btn.innerHTML = "Collapse All";
    for (let i = 0; i < descriptions.length; i++) {
      descriptions[i].classList.remove("hidden");
    }
  } else {
    btn.innerHTML = "Expand All";
    let descriptions = document.getElementsByClassName("description");
    for (let i = 0; i < descriptions.length; i++) {
      descriptions[i].classList.add("hidden");
    }
  }

  for (let i = 0; i < collapsibles.length; i++) {
    collapsibles[i].classList.toggle("active");
  }

  for (let i = 0; i < arrows.length; i++) {
    arrows[i].innerHTML = arrows[i].innerHTML == "▴" ? "▾" : "▴";
  }
}

document.querySelector("#collapsible-1").addEventListener("click", collapse);
document.querySelector("#collapsible-2").addEventListener("click", collapse);
document.querySelector("#collapsible-3").addEventListener("click", collapse);

document.getElementById("expand").addEventListener("click", openAll);
