function collapse(e) {
  var id = e.target.id.split("-")[1];
  e.target.classList.toggle("active");

  var description = document.getElementById("description-" + id);
  description.classList.toggle("hidden");

  var arrow = document.getElementById("arrow-" + id);
  arrow.innerHTML = arrow.innerHTML == "▴" ? "▾" : "▴";

  // check if all are expanded
  var descriptions = document.getElementsByClassName("description");
  var allExpanded = true;

  for (var i = 0; i < descriptions.length; i++) {
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
  var btn = document.getElementById("expand");
  var descriptions = document.getElementsByClassName("description");
  var collapsibles = document.getElementsByClassName("collapsible");
  var arrows = document.getElementsByClassName("arrow");

  if (btn.innerHTML == "Expand All") {
    btn.innerHTML = "Collapse All";
    for (var i = 0; i < descriptions.length; i++) {
      descriptions[i].classList.remove("hidden");
    }
  } else {
    btn.innerHTML = "Expand All";
    var descriptions = document.getElementsByClassName("description");
    for (var i = 0; i < descriptions.length; i++) {
      descriptions[i].classList.add("hidden");
    }
  }

  for (var i = 0; i < collapsibles.length; i++) {
    collapsibles[i].classList.toggle("active");
  }

  for (var i = 0; i < arrows.length; i++) {
    arrows[i].innerHTML = arrows[i].innerHTML == "▴" ? "▾" : "▴";
  }
}

document.querySelector("#collapsible-1").addEventListener("click", collapse);
document.querySelector("#collapsible-2").addEventListener("click", collapse);
document.querySelector("#collapsible-3").addEventListener("click", collapse);

document.getElementById("expand").addEventListener("click", openAll);
