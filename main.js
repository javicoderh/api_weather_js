const result = document.getElementById('displayScreen');
const form = document.getElementById('infoInput');
const nameCity = document.getElementById('city');
const nameCountry = document.getElementById('country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('fill the form completely');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
    console.log(nameCity.value);
    console.log(nameCountry.value);
})

function callAPI(city, country){
    const apiId = 'f6a64b879197c635f85b34d0b8bcd052';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('City not founded...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);
    const content = document.createElement('div');
    content.innerHTML = `
      <h5>weather in ${name}</h5>
      <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
      <h2>${degrees}°C</h2>
      <p>Max: ${max}°C</p>
      <p>Min: ${min}°C</p>
    `;
    result.appendChild(content);
   }
     function showError(message){    
     const alert = document.createElement('p');
     alert.classList.add('alert-message');
     alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
     alert.remove();
    },3000);
   }


function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}