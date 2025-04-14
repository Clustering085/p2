
const API_KEY = '4186225a10014d2881f83456251404';

function setLocation(city) {
  if (city === 'Busan'){city = 'Pusan'}
  document.getElementById('location').value = city;
  getWeather();
}

async function getWeather() {
  const location = document.getElementById('location').value;
  if (!location) return;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
    );
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
      <p>온도: ${data.current.temp_c}°C</p>
      <p>날씨: ${data.current.condition.text}</p>
      <p>습도: ${data.current.humidity}%</p>
      <p>풍속: ${data.current.wind_kph} km/h</p>
    `;
  } catch (error) {
    document.getElementById('weather-info').innerHTML = `
      <p style="color: red;">에러: 날씨 정보를 가져올 수 없습니다.</p>
    `;
  }
}
