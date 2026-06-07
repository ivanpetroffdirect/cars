document.getElementById('searchBtn').addEventListener('click', function() {
  const query = document.getElementById('carInput').value.trim().toLowerCase();
  const container = document.getElementById('resultsContainer');
  
  if (!query) {
    container.innerHTML = `<p class="placeholder-text">⚠️ Введите марку или модель для поиска</p>`;
    return;
  }
  
  container.innerHTML = `<p class="placeholder-text">🔍 Сканируем базу импортеров для "${query}"...</p>`;
  
  // Имитируем небольшую задержку для солидности интерфейса
  setTimeout(() => {
    // Читаем файл data.json прямо из твоего репозитория
    fetch('data.json')
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        return response.json();
      })
      .then(cars => {
        // Фильтруем данные: ищем совпадение по марке или модели
        const filteredCars = cars.filter(car => 
          car.brand.toLowerCase().includes(query) || 
          car.model.toLowerCase().includes(query) ||
          car.title.toLowerCase().includes(query)
        );
        
        if (filteredCars.length === 0) {
          container.innerHTML = `<p class="placeholder-text">❌ Ничего не найдено по запросу "${query}". Попробуйте "Kia" или "Geely"</p>`;
          return;
        }
        
        // Сортируем от дешевых к дорогим
        const sortedCars = filteredCars.sort((a, b) => a.price - b.price);
        
        container.innerHTML = ''; // Очищаем контейнер
        
        // Отрисовываем карточки
        sortedCars.forEach((car, index) => {
          const cardClass = index === sortedCars.length - 1 ? 'car-card expensive' : 'car-card';
          
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
      })
      .catch(error => {
        console.error(error);
        container.innerHTML = `<p class="placeholder-text">💥 Ошибка при обращении к базе данных.</p>`;
      });
  }, 800);
});
