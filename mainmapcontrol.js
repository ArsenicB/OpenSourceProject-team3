
var mapContainer = document.getElementById('map');
var mapOption = {
  center: new kakao.maps.LatLng(33.450701, 126.570667), //지도 중심좌표
  level: 5 //지도 확대 레벨
}
var map = new kakao.maps.Map(mapContainer, mapOption);

if (navigator.geolocation) { //브라우저가 위치정보 제공을 지원할경우
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude, //위도
      lon = position.coords.longitude; //경도
    var location = new kakao.maps.LatLng(lat, lon); //현재 위치의 좌표값을 가진 장소 지정
    map.setCenter(location);
    tourapicall(lat, lon)
    weatherReport(lat, lon);
  });
} else {
  location = new kakao.maps.LatLng(33.450701, 126.570667);
  map.setCenter(location);
}

kakao.maps.event.addListener(map, 'dragend', function() {
  var latlng = map.getCenter();
  var lat = latlng.getLat();
  var lon = latlng.getLng();
  tourapicall(lat, lon);
  weatherReport(lat, lon);
});

function weatherReport(lat, lon) {
  var today = makeDate();
  var xhr = new XMLHttpRequest();
  var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst'; /*URL*/
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + '15DREnV4%2FzTzQocDLJr05cb05qioRq3nUCYxAeeMu9BCBPvNaCWgLuLQAMLKlYRnwBJhjwCShKH0jqk8gnflbA%3D%3D'; /*Service Key*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
  queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
  queryParams += '&' + encodeURIComponent('base_date') + '=' + today; /**/
  queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0500'); /**/
  queryParams += '&' + encodeURIComponent('nx') + '=' + lat; /**/
  queryParams += '&' + encodeURIComponent('ny') + '=' + lon; /**/
  xhr.open('GET', url + queryParams);

  /*데이터 파싱*/
  xhr.responseType = 'json';
  xhr.onload = function() {
    var data = xhr.response.response.body.items.item;
    var skyData;
    var tmnData;
    var tmxData;
    var viewText;
    var d = new Date();
    var thisMonth = d.getMonth();
    var thisDate = d.getDate();
    var printWeather;
    viewText = '<div>' + thisMonth + '/'+thisDate+'</div>';
    console.log(data);
    for(var i =0; i<data.length; i++){
      if((data[i].category == "SKY") && (data[i].fcstTime == 1200)){
        sktData = data[i].fcstValue;
      }
      else if(data[i].category == "TMN"){
        tmnData = data[i].fcstValue;
      }
      else if(data[i].category == "TMX"){
        tmxData = data[i].fcstValue;
      }
    }
    if(skyData == 1){
      viewText = viewText + '<img id = "w_info" src= "D://open_source//sunny.jpg" alt="ERROR" width="150">';
      printWeather = viewText + '<div>' + tmnData +'℃'+'/'+tmxData+'℃'+'</div>';

    }
    else if(skyData == 3){
      viewText = viewText + '<img id = "w_info" src = "D://open_source//cloudy.jpg" alt="ERROR" width="150">';
      printWeather = viewText + '<div>' + tmnData +'℃'+'/'+tmxData+'℃'+'</div>';
    }
    else if(skyData == 4){
      viewText = viewText + '<img id = "w_info" src = "D://open_source//many_clouds.jpg" alt="ERROR" width="150">';
      printWeather = viewText + '<div>' + tmnData +'℃'+'/'+tmxData+'℃'+'</div>';
    }
    document.getElementById('weather').innerHTML=printWeather;
  }
  /*
  1. 날짜와 시간 불러오는 코드 만들기
  2. 받아온 날씨 정보를 어디에 띄워야 하는가
  3. 카테고리, VAlue, basedata
  4. POP, REH, TMN, TMX, PTY 파싱
  */
  xhr.send('');

}



/*날짜 받아오는 함*/
function makeDate() {
  var d = new Date();
  var n;
  var returnDate;
  if (d.getMonth() < 9) {
    n = d.getFullYear() + '0' + (d.getMonth() + 1) + '' + d.getDate();
  } else {
    n = d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate();
  }
  returnDate = n;
  return returnDate;
};

function tourapicall(lat, lon) {
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
        latlng: new kakao.maps.LatLng(obj.item[i].mapy, obj.item[i].mapx),
        content: '<div>' + obj.item[i].title +'<br>'+obj.item[i].addr1+ '</div>'
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
      var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content
      });
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

      //인포윈도우를 여는 함수
      function makeOverListener(map, marker, infowindow) {
        return function() {
          infowindow.open(map, marker);
        };
      }
      //인포윈도우를 닫는 함수
      function makeOutListener(infowindow) {
        return function() {
          infowindow.close();
        };
      }
    }
  }

xhr.send('');
}

function areaSearch() {
  var selectarea = document.getElementById('city');
  var selectsigungu = document.getElementById('country');
  var address;
  var sigungu;
  if(selectsigungu.selectedIndex === 0){
    address = selectarea.options[selectarea.selectedIndex].text;
    sigungu = 0;
  }else{
    address = selectarea.options[selectarea.selectedIndex].text+selectsigungu.options[selectsigungu.selectedIndex].text;
    sigungu = selectsigungu.options[selectsigungu.selectedIndex].value;
  }


  /*지도 중심좌표 변경*/
  var geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(address, function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      map.setCenter(coords);
    }
  });
areaapicall(selectarea.options[selectarea.selectedIndex].value,sigungu);
map.setLevel(8);

}

function areaapicall(area, sigungu){
  var xhr = new XMLHttpRequest();
var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'Qmxlp4pFKUj9NMkhZTxOAlYfvf2Jk%2BPbu3nT8soq5iibgzkV92lHdPtbQw0CVBy2qLBz3fxYUdRJkXlBCETe2g%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('4000'); /**/
queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /**/
queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('A'); /**/
queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('12'); /**/
queryParams += '&' + encodeURIComponent('areaCode') + '=' + area; /**/
if(!(sigungu === 0)){
  queryParams += '&' + encodeURIComponent('sigunguCode') + '=' + sigungu; /**/
}
queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /**/
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json'); /*JSON형태의 데이터로 호출*/
xhr.open('GET', url + queryParams);
xhr.responseType = 'json';
xhr.onload = function() {
  var obj = xhr.response.response.body.items;
  var i = 0;
  var positions = new Array();
  while (i < obj.item.length) {
    if((!(obj.item[i].title === "현충사"))&&(!(obj.item[i].title === "광화문"))){
    var markerData = {
      title: obj.item[i].title,
      latlng: new kakao.maps.LatLng(obj.item[i].mapy, obj.item[i].mapx),
      content: '<div style="padding:5px">' + obj.item[i].title +'<br>'+obj.item[i].addr1+ '</div>'
    };
    positions.push(markerData);
  }
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
    var infowindow = new kakao.maps.InfoWindow({
      content: positions[i].content
    });
    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

    //인포윈도우를 여는 함수
    function makeOverListener(map, marker, infowindow) {
      return function() {
        infowindow.open(map, marker);
      };
    }
    //인포윈도우를 닫는 함수
    function makeOutListener(infowindow) {
      return function() {
        infowindow.close();
      };
    }
  }
}

xhr.send('');
}
