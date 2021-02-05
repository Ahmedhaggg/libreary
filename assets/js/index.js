document.querySelectorAll('.left').forEach( leftBtn => {
    leftBtn.addEventListener('click', e => {
        let endParcent = [0, 0, 0]
        let parcent = parseInt(e.target.parentElement.dataset.trans)
        if (
            (window.innerWidth > 991 && parcent == endParcent[0]) ||
            (window.innerWidth > 575 && parcent == endParcent[1]) || 
            (window.innerWidth < 575 && parcent == endParcent[2])
        ) false; else {
            e.target.parentElement.dataset.trans = parcent - 100 
            e.target.parentElement.previousElementSibling.style.transition = "transform .5s";
            e.target.parentElement.previousElementSibling.style.transform = 'translateX('+ (-(parcent - 100))+'%)'
        }
          
    })
})
document.querySelectorAll('.right').forEach( leftBtn => {
    leftBtn.addEventListener('click', e => {
        let endParcent = [100, 300, 700]
        let parcent = parseInt(e.target.parentElement.dataset.trans)
        if (
            (window.innerWidth > 991 && parcent == endParcent[0]) ||
            (window.innerWidth > 575 && parcent == endParcent[1]) || 
            (window.innerWidth < 575 && parcent == endParcent[2])
        ) false; else {
            e.target.parentElement.dataset.trans =  parcent + 100
            e.target.parentElement.previousElementSibling.style.transition = "transform .5s";
            e.target.parentElement.previousElementSibling.style.transform = 'translateX('+(-(parcent + 100))+'%)'
        }
    })
})
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat:    28.981760, lng: 31.005380 },
        zoom: 14,
    });
}