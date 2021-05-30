var mapContainer = document.getElementById('map');
var mapOption = {
  center: new kakao.maps.LatLng(33.450701, 126.570667), //지도 중심좌표
  level: 5 //지도 확대 레벨
}
var map = new kakao.maps.Map(mapContainer, mapOption);

if(navigator.geolocation){ //브라우저가 위치정보 제공을 지원할경우
  navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude, //위도
        lon = position.coords.longitude; //경도
    var location = new kakao.maps.LatLng(lat, lon); //현재 위치의 좌표값을 가진 장소 지정
    map.setCenter(location);

    var xhr = new XMLHttpRequest();
        var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList'; /*API 호출 주소*/
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'Qmxlp4pFKUj9NMkhZTxOAlYfvf2Jk%2BPbu3nT8soq5iibgzkV92lHdPtbQw0CVBy2qLBz3fxYUdRJkXlBCETe2g%3D%3D'; /*API 호출 키*/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /*한번에 불러오는 데이터의 양*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지 번호*/
        queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /*사용하는 OS*/
        queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /*프로그램 명*/
        queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('A'); /*정렬기준*/
        queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('12'); /**/
        queryParams += '&' + encodeURIComponent('mapX') + '=' + lon; /*경도*/
        queryParams += '&' + encodeURIComponent('mapY') + '=' + lat; /*위도*/
        queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent('1000'); /*범위 (m단위)*/
        queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /*리스트화 여부 N일시 페이지 수 반환*/
        queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json'); /*JSON형태의 데이터로 호출*/
        xhr.open('GET', url + queryParams);
        xhr.responseType = 'json';
        xhr.onload = function() {
          var obj = xhr.response.response.body.items;
          //document.write(JSON.stringify(xhr.response));
          var i = 0;
          var positions = new Array();
          while (i < obj.item.length) {
            var markerData = {
              title: obj.item[i].title,
              latlng: new kakao.maps.LatLng(obj.item[i].mapy, obj.item[i].mapx)
            };
            positions.push(markerData);
            i++;
          }
          var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

          for (var i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: positions[i].latlng, // 마커를 표시할 위치
              title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage // 마커 이미지
            });
          }

        }
        xhr.send('');

  });
}else{
  location = new kakao.maps.LatLng(33.450701, 126.570667);
  map.setCenter(location);
}
