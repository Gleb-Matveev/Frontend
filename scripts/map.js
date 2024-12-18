let visitedRoutes = JSON.parse(localStorage.getItem('visitedRoutes')) || [];
        let firstClickCoords = null;
        let secondClickCoords = null;
        let lineToCursor = null;

        ymaps.ready(init);

        function init() {
            const map = new ymaps.Map('map', {
                center: [59.98, 30.22],
                zoom: 10
            });

            var geocoder = ymaps.geocode;

            // Отображаем сохраненные маршруты
            visitedRoutes.forEach(function(route) {
                const polyline = new ymaps.Polyline(route, {}, {
                    strokeColor: '#0000FF', // Синий цвет линии
                    strokeWidth: 4,         // Толщина линии
                    strokeOpacity: 0.7      // Прозрачность линии
                });
                map.geoObjects.add(polyline);
            });

            // Обработчик для двойного клика
            map.events.add('dblclick', function(e) {
                e.preventDefault();
                const coords = e.get('coords');
                if (!firstClickCoords) {
                    // Ставим первую точку
                    firstClickCoords = coords;
                    const firstPoint = new ymaps.Placemark(firstClickCoords, {
                        hintContent: 'Первая точка'
                    },
                    {
                        // Использование стандартной иконки точки
                        iconLayout: 'default#image',
                        iconImageHref: 'https://yandex.ru/maps/constructor/2.1/images/point.svg', // Пример точки
                        iconImageSize: [10, 10], // Размер точки
                        iconImageOffset: [-5, -5] // Смещение для правильного отображения
                    });
                    map.geoObjects.add(firstPoint);

                    // Линия, тянущаяся к курсору
                    lineToCursor = new ymaps.Polyline([firstClickCoords, firstClickCoords], {}, {
                        strokeColor: '#007BFF',
                        strokeWidth: 2,
                        strokeOpacity: 0.5
                    });
                    map.geoObjects.add(lineToCursor);
                } else {
                    // Ставим вторую точку
                    secondClickCoords = coords;
                    const secondPoint = new ymaps.Placemark(secondClickCoords, {
                        hintContent: 'Вторая точка'
                    },
                    {
                        // Использование стандартной иконки точки
                        iconLayout: 'default#image',
                        iconImageHref: 'https://yandex.ru/maps/constructor/2.1/images/point.svg', // Пример точки
                        iconImageSize: [10, 10], // Размер точки
                        iconImageOffset: [-5, -5] // Смещение для правильного отображения
                    });
                    map.geoObjects.add(secondPoint);

                    // Соединяем точки линией
                    const polyline = new ymaps.Polyline([firstClickCoords, secondClickCoords], {}, {
                        strokeColor: '#04AA6D', // Синий цвет линии
                        strokeWidth: 4,
                        strokeOpacity: 0.7
                    });
                    map.geoObjects.add(polyline);

                    // Сохраняем маршрут в localStorage
                    visitedRoutes.push([firstClickCoords, secondClickCoords]);
                    localStorage.setItem('visitedRoutes', JSON.stringify(visitedRoutes));

                    // Очищаем временные переменные
                    firstClickCoords = null;
                    secondClickCoords = null;
                    map.geoObjects.remove(lineToCursor);
                    lineToCursor = null;
                }
            });

            // Линия, которая тянется от первой точки к курсору
            map.events.add('mousemove', function(e) {
                if (firstClickCoords) {
                    const cursorCoords = e.get('coords');
                    if (lineToCursor) {
                        lineToCursor.geometry.setCoordinates([firstClickCoords, cursorCoords]);
                    }
                }
            });

            map.events.add('click', function (e) {
                var coords = e.get('coords');
                var balloonContent = "Определяем улицу по этим координатам: " + coords.join(", ");

                // Геокодирование клика
                geocoder(coords).then(function (res) {
                    var firstGeoObject = res.geoObjects.get(0);
                    var street = firstGeoObject.getAddressLine(); // Название улицы
                    var streetCoords = firstGeoObject.geometry.getCoordinates(); // Координаты клика
                    console.log(coords)

                    highlightStreet(street, streetCoords);
                });
            });

            // Функция для выделения улицы (создадим полилинию вокруг найденных координат)
            function highlightStreet(street, streetCoords) {
                // Для примера создадим полилинию, соединяющую несколько точек
                // В реальном приложении вам нужно будет использовать точные данные для границ улицы
                let polyline = new ymaps.Polyline([
                    streetCoords
                ], {}, {
                    strokeColor: '#FF0000',  // Красный цвет для выделения
                    strokeWidth: 6,
                    strokeOpacity: 0.7
                });

                map.geoObjects.add(polyline);

                // Выводим сообщение
                alert('Улица выделена красным!');
            }
}