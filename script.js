document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== ''){
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=0cb5d1d8ed0269224ff750f6beabc971&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                temp_min: json.main.temp_min,
                temp_max: json.main.temp_max,
                tempIcon: json.weather[0].icon,
                tempDescription: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            showWarning('Não encontramos esta Localização.');
        }
    }else{
       clearInfo(); 
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name} - ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.tmin').innerHTML = `min: ${json.temp_min} <sup>ºC</sup>`;
    document.querySelector('.tmax').innerHTML = `max: ${json.temp_max} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.description').innerHTML = `${json.tempDescription}`;

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    document.querySelector('.ventoAngulo').innerHTML = `${json.windAngle}<sup>o</sup>`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
   document.querySelector('.aviso').innerHTML = msg; 
}