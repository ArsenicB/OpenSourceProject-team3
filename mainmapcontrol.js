var mapContainer = document.getElementById('map');
var mapOption = {
  center: new kakao.maps.LatLng(33.450701, 126.570667) //지도 중심좌표
  level: 5 //지도 확대 레벨
}
var map = kakao.maps.Map(mapContainer, mapOption);

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(positon){
    var lat = position.coords.latitude, //위도
        lon = position.coords.longitude; //경도
    var location = kakao.maps.LatLng(lat, lon); //현재 위치의 좌표값을 가진 장소 지정
    map.setCenter(location);
  });
}else{
  location = new kakao.maps.LatLng(33.450701, 126.570667);
  map.setCenter(location);
}
