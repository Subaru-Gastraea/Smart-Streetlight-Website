var myDiv = document.getElementById("myDiv");
var selectElem = document.getElementById("sLight");

var slider = document.getElementById("myRange");
var output = document.getElementById("rangeValue");
var localStorageSliderNumber;

const batteryLevel = document.querySelector('.battery-level');
var level;

var production1 = [20, 10, 5, 2, 26, 30, 42, 50, 17, 5, 2, 20, 30, 17, 30, 10, 54, 26, 20, 34, 45, 44, 36, 78];
var consumption1 = [8, 15, 33, 21, 54, 46, 47, 50, 26, 45, 21, 13, 53, 43, 16, 19, 51, 23, 47, 36, 58, 67, 49, 23];
var production;
var consumption;
var electricData;

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

    // Chart
    if (window.localStorage.getItem('chart'+selectElem.selectedIndex) != null) {
        electricData = window.localStorage.getItem('chart'+selectElem.selectedIndex);
        production = electricData.split(',').slice(0,24);
        consumption = electricData.split(',').slice(24);
    } else {
        production = production1.map(x => x * selectElem.selectedIndex);
        consumption =  consumption1.map(x => x * selectElem.selectedIndex);
        electricData = [production, consumption];
        window.localStorage.setItem('chart'+selectElem.selectedIndex, electricData);
    }
    myChart.data.datasets[0].data = production;
    myChart.data.datasets[1].data = consumption;
    myChart.update();

    myDiv.style.display = (selectElem.selectedIndex !== 0) ? "block" : "none";
})

slider.addEventListener('input', function() {
    output.innerHTML = this.value; // Display the default slider value
    window.localStorage.setItem('sliderValue'+selectElem.selectedIndex, this.value);
});