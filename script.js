// 1. Kendi API Anahtarınla Değiştir!
const API_KEY = '3bf5f72caec8a1c142d8ad082c6ecc75'; 

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.getElementById('weather-display');

// Butona tıklandığında çalışacak olay dinleyicisini ekle
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim(); // Şehir adını al ve boşlukları temizle
    if (city) {
        getWeather(city); // Şehir adı varsa hava durumu fonksiyonunu çağır
    } else {
        weatherDisplay.innerHTML = '<p style="color: red;">Lütfen bir şehir adı giriniz.</p>';
    }
});
async function getWeather(city) {
    // API URL'sini oluştur. 
    // 'units=metric' ile Celsius (Santigrat) cinsinden sıcaklık alıyoruz.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`;

    try {
        weatherDisplay.innerHTML = '<p>Yükleniyor...</p>'; // Kullanıcıya yükleniyor mesajı göster

        const response = await fetch(url);

        // HTTP Hata Kontrolü (Örn: 404 Şehir Bulunamadı)
        if (!response.ok) {
            throw new Error('Şehir bulunamadı veya API hatası.');
        }

        const data = await response.json(); // Gelen veriyi JSON'a çevir
        displayWeather(data); // Veriyi ekrana basan fonksiyonu çağır

    } catch (error) {
        console.error('Hata:', error);
        weatherDisplay.innerHTML = `<p style="color: red;">Hata: ${error.message}</p>`;
    }
}
function displayWeather(data) {
    // Veri yapısı: data.name (Şehir), data.main.temp (Sıcaklık), data.weather[0].description (Açıklama)
    
    const city = data.name;
    const temp = Math.round(data.main.temp); // Sıcaklığı tam sayıya yuvarla
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon; // Hava durumu ikonu kodu (Örn: 04d)

    // OpenWeatherMap ikon URL'si
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherDisplay.innerHTML = `
        <h2 class="city-name">${city}</h2>
        <img src="${iconUrl}" alt="${description}">
        <div class="temp">${temp}°C</div>
        <div class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</div>
        <p>Nem: ${data.main.humidity}%</p>
        <p>Rüzgar Hızı: ${data.wind.speed} m/s</p>
    `;
}