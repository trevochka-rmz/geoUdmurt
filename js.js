function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.02, 82.56],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 8

    
    });
    let drawing=false;
    let lines_points={};
    // массив вершины, полилинии(узлы, рукава)
    let vertices = [ ];
    let edges = [ ];


    myMap.events.add('click', function (e) {
        // Получение координат щелчка
        var coords = e.get('coords');
        var myPlacemark = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates:coords
            }
        });
        myPlacemark.events.add('click', function(e){
            var point = e.get('target');
            var coords = point.geometry.getCoordinates();
            if(remove){
                myMap.geoObjects.remove(point);
///получить все линии и удалить линию содержащую координаты данной точки
                return;
            }
            if(!drawing){
                lines_points.startPoint = coords;
                drawing=true;
                
            }
            else{
                drawing=false;
                lines_points.endPoint= coords;
                var myPolyline = new ymaps.GeoObject({
                    geometry: {
                        type: "LineString",
                        coordinates: [lines_points.startPoint, lines_points.endPoint]
                    }
                });
                myMap.geoObjects.add(myPolyline);
                lines_points={};
            }
        })
        myMap.geoObjects.add(myPlacemark); 

    });


}

let remove = false;

function removePlacemarks(){
    console.log('remove = ' + remove);
    remove = !remove;
} 
 document.addEventListener("DOMContentLoaded", function() {
        // Находим кнопку по ее id
        var removeButton = document.getElementById("remove-placemarks-button");
    
        // Добавляем обработчик события click
        removeButton.addEventListener("click", function() {
            // Вызываем функцию для удаления меток
            removePlacemarks();
        });
    });

// Создание маршрута.
var multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
        [55.734470, 37.58000],
        [55.734336, 37.51218],
        [55.724102, 37.19912]
    ]
});
