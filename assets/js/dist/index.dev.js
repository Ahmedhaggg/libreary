"use strict";

document.querySelectorAll('.left').forEach(function (leftBtn) {
  leftBtn.addEventListener('click', function (e) {
    var endParcent = [0, 0, 0];
    var parcent = parseInt(e.target.parentElement.dataset.trans);
    if (window.innerWidth > 991 && parcent == endParcent[0] || window.innerWidth > 575 && parcent == endParcent[1] || window.innerWidth < 575 && parcent == endParcent[2]) false;else {
      e.target.parentElement.dataset.trans = parcent - 100;
      e.target.parentElement.previousElementSibling.style.transition = "transform .5s";
      e.target.parentElement.previousElementSibling.style.transform = 'translateX(' + -(parcent - 100) + '%)';
    }
  });
});
document.querySelectorAll('.right').forEach(function (leftBtn) {
  leftBtn.addEventListener('click', function (e) {
    var endParcent = [100, 300, 700];
    var parcent = parseInt(e.target.parentElement.dataset.trans);
    if (window.innerWidth > 991 && parcent == endParcent[0] || window.innerWidth > 575 && parcent == endParcent[1] || window.innerWidth < 575 && parcent == endParcent[2]) false;else {
      e.target.parentElement.dataset.trans = parcent + 100;
      e.target.parentElement.previousElementSibling.style.transition = "transform .5s";
      e.target.parentElement.previousElementSibling.style.transform = 'translateX(' + -(parcent + 100) + '%)';
    }
  });
});
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 28.981760,
      lng: 31.005380
    },
    zoom: 14
  });
}