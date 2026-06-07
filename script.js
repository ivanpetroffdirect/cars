// Имитируем базу данных, которую собрал наш парсер с разных сайтов
const mockParsedData = [
  {
    company: "JPKorea (СПб)",
    title: "Kia Sportage 2.0 Дизель (Из Кореи)",
    meta: "Год: 2022 | Пробег: 28 000 км | Комплектация: Prestige",
    price: 2450000,
    note: "Цена под ключ во Владивостоке + доставка в СПб",
    link: "https://jpkorea.ru/avto-iz-korei-spb/"
  },
  {
    company: "VlAutoImport (Владивосток)",
    title: "Kia Sportage 2.0 Дизель (Аукцион)",
    meta: "Год: 2022 | Пробег: 35 000 км | Комплектация: Trendy",
    price: 2310000,
    note: "Цена в СПб с учетом автовоза (~130к)",
    link: "#"
  },
  {
    company: "ChinaCarClub (Москва)",
    title: "Kia Sportage 1.5T Бензин (Новый, Китай)",
    meta: "Год: 2024 | Пробег: 0 км | Комплектация: Luxury",
    price: 2890000,
    note: "В наличии в Москве, утильсбор включен",
    link: "#"
  }
];

// Слушаем клик по кнопке
document.getElementById('searchBtn').addEventListener('click', function() {
  const query = document.getElementById('carInput').value;
  const container = document.getElementById('resultsContainer');
  
  // Показываем простую анимацию загрузки (как будто парсер ищет прямо сейчас)
  container.innerHTML = `<p class="placeholder-text">🔍 Парсим jpkorea.ru и другие площадки для "${query}"...</p>`;
  
  setTimeout(() => {
    // Сортируем данные от дешевых к дорогим перед выдачей
    const sortedData = [...mockParsedData].sort((a, b) => a.price - b.price);
    
    container.innerHTML = ''; // Очищаем контейнер
    
    // Генерируем карточки на лету
    sortedData.forEach((car, index) => {
      // Самый дешевый вариант помечаем как топ, дорогой — другим цветом
      const cardClass = index === sortedData.length - 1 ? 'car-card expensive' : 'car-card';
      
      const cardHtml = `
        <div class="${cardClass}">
          <div>
            <span class="company-badge">${car.company}</span>
            <h3 class="car-title">${car.title}</h3>
            <div class="car-meta">${car.meta}</div>
            <a href="${car.link}" target="_blank" class="go-to-site">Открыть оригинал на сайте компании →</a>
          </div>
          <div class="price-box">
            <div class="price-value">${car.price.toLocaleString()} ₽</div>
            <div class="price-note">${car.note}</div>
          </div>
        </div>
      `;
      container.innerHTML += cardHtml;
    });
  }, 1200); // Имитируем задержку парсинга в 1.2 секунды
});
