var button = document.querySelector('.button');
var inputValue = document.querySelector('.search');
var temp = document.querySelector('.temp-value');
var humid = document.querySelector('.humid-value');
var desc = document.querySelector('.desc-value');
var stat = document.querySelector('.status');
var place = document.querySelector('.location');
var icon = new Skycons({color: '#222'});
icon.set('icon','clear-day');
icon.play();

button.addEventListener('click',function(){
     fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=163e21c5342491b928b6b4eef6394f05')
     .then(response => response.json())
     .then(data => {
          console.log(data);

          //temperature is in Kelvin
          var tempValue = data['main']['temp']-273.15;
          tempValue = tempValue.toFixed(2);

          var descValue = data['weather'][0]['description'];

          var humidValue = data['main']['humidity'];

          var statusValue = data['weather'][0]['main'];

          stat.innerHTML = statusValue;
          place.innerHTML = caps(inputValue.value);

          if(statusValue == "Clouds" || statusValue=="Haze"){
               icon.set('icon','partly-cloudy-day');
               icon.play();
          }
          else if(statusValue == "Rain"){
               icon.set('icon','rain');
               icon.play();
          }
          else {
               icon.set('icon','clear-day');
               icon.play();
          }
          temp.innerHTML = tempValue+' <span>&#8451;</span>';
          humid.innerHTML = humidValue + ' %';
          desc.innerHTML = descValue;
     })

     .catch(err => alert("Invalid city name!"))
})

function caps(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
