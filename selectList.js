var myDiv = document.getElementById("myDiv");
var selectElem = document.getElementById("sLight");

var slider = document.getElementById("myRange");
var output = document.getElementById("rangeValue");
var localStorageSliderNumber;

const batteryLevel = document.querySelector('.battery-level');
var level;

selectElem.addEventListener('change', function(){
    // Range slider
    if (window.localStorage.getItem('sliderValue'+selectElem.selectedIndex) != null) {
        localStorageSliderNumber = window.localStorage.getItem('sliderValue'+selectElem.selectedIndex);
    } else {
        window.localStorage.setItem('sliderValue'+selectElem.selectedIndex, '50');
        localStorageSliderNumber = 50;
    }
    slider.value = localStorageSliderNumber;
    output.innerHTML = localStorageSliderNumber;
    
    // Battery
    if (window.localStorage.getItem('battery'+selectElem.selectedIndex) != null) {
        level = window.localStorage.getItem('battery'+selectElem.selectedIndex);
    } else {
        window.localStorage.setItem('battery'+selectElem.selectedIndex, selectElem.selectedIndex*20);
        level = selectElem.selectedIndex*20;
    }
    const status = level + "%";
    batteryLevel.style.width = status;
    batteryLevel.innerHTML = status;

    myDiv.style.display = (selectElem.selectedIndex !== 0) ? "block" : "none";
})

slider.addEventListener('input', function() {
    output.innerHTML = this.value; // Display the default slider value
    window.localStorage.setItem('sliderValue'+selectElem.selectedIndex, this.value);
});