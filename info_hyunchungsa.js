var xhr = new XMLHttpRequest();
var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'Qmxlp4pFKUj9NMkhZTxOAlYfvf2Jk%2BPbu3nT8soq5iibgzkV92lHdPtbQw0CVBy2qLBz3fxYUdRJkXlBCETe2g%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest');
queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC');
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y');
queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('A');
queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('12');
queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent('현충사');
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
xhr.open('GET', url + queryParams);
xhr.responseType = 'json';
xhr.onload = function() {
  var path = xhr.response.response.body.items.item;
  var latlng = new kakao.maps.LatLng(path.mapy, path.mapx);
  var contid = path.contentid;
  var conttype = path.contenttypeid;

  document.getElementById('title').innerText = path.title;
  document.getElementById('tourimg').src = path.firstimage;
  document.getElementById('addr').innerText = path.addr1;
  document.getElementById('tel').innertext = path.tel;

  var xhr_a = new XMLHttpRequest();
  var url_a = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon'; /*URL*/
  var queryParams_a = '?' + encodeURIComponent('ServiceKey') + '=' + 'Qmxlp4pFKUj9NMkhZTxOAlYfvf2Jk%2BPbu3nT8soq5iibgzkV92lHdPtbQw0CVBy2qLBz3fxYUdRJkXlBCETe2g%3D%3D'; /*Service Key*/
  queryParams_a += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
  queryParams_a += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  queryParams_a += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC');
  queryParams_a += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest');
  queryParams_a += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(contid);
  queryParams_a += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(conttype);
  queryParams_a += '&' + encodeURIComponent('overviewYN') + '=' + encodeURIComponent('Y');
  queryParams_a += '&' + encodeURIComponent('defaultYN') + '=' + encodeURIComponent('Y');
  queryParams_a += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
  xhr_a.open('GET', url_a + queryParams_a);

  xhr_a.responseType = 'json';
  xhr_a.onload = function() {
    var path_a = xhr_a.response.response.body.items.item;
    document.getElementById('tourinfo').innerHTML = path_a.overview;
    document.getElementById('homepage').innerHTML = "<a href="+path_a.homepage;
  }
  xhr_a.send('');

  var xhr_b = new XMLHttpRequest();
var url_b = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro'; //소개정보(휴일, 이용시간)를 불러오기 위한 URL
var queryParams_b = '?' + encodeURIComponent('ServiceKey') + '='+'Qmxlp4pFKUj9NMkhZTxOAlYfvf2Jk%2BPbu3nT8soq5iibgzkV92lHdPtbQw0CVBy2qLBz3fxYUdRJkXlBCETe2g%3D%3D'; /*Service Key*/
queryParams_b += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
queryParams_b += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams_b += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC');
queryParams_b += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest');
queryParams_b += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(contid);
queryParams_b += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(conttype);
queryParams_b += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
xhr_b.open('GET', url_b + queryParams_b);
xhr_b.responseType = 'json';

xhr_b.onload = function() {
  var path_b = xhr_b.response.response.body.items.item;
  document.getElementById('breakday').innerText = path_b.restdate;
  document.getElementById('time').innerText = path_b.usetime;
}

	var mapContainer1 = document.getElementById('map1');
	var mapOption1 = {
		center: latlng,
		level:6
	}
	var map1 = new kakao.maps.Map(mapContainer1, mapOption1);
	tourapicall(latlng.getLat(), latlng.getLng(), map1);
	var marker = new kakao.maps.Marker({
		position:latlng
	});
	marker.setMap(map1);

  var mapContainer2 = document.getElementById('map2');
  var mapOption2 = {
    center: latlng,
    level:6
  }
  var map2 = new kakao.maps.Map(mapContainer2, mapOption2);
  rescall(latlng.getLat(), latlng.getLng(), map2);
  var marker = new kakao.maps.Marker({
    position:latlng
  });
  marker.setMap(map2);
}
xhr.send('');

function tourapicall(lat, lon, map) {
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
  queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent('5000'); /*범위 (m단위)*/
  queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /*리스트화 여부 N일시 페이지 수 반환*/
  queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json'); /*JSON형태의 데이터로 호출*/
  xhr.open('GET', url + queryParams);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var obj = xhr.response.response.body.items;
    var i = 0;
    var positions = new Array();
    while (i < obj.item.length) {
      if(!(obj.item[i].title === "현충사")){
				var markerData = {
	        title: obj.item[i].title,
	        latlng: new kakao.maps.LatLng(obj.item[i].mapy, obj.item[i].mapx),
          content: '<div style="padding:5px">' + obj.item[i].title + '<br>' + obj.item[i].addr1 + '</div>'
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

function rescall(lat, lon, map) {
  var xhr = new XMLHttpRequest();
  var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList'; /*API 호출 주소*/
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'Qmxlp4pFKUj9NMkhZTxOAlYfvf2Jk%2BPbu3nT8soq5iibgzkV92lHdPtbQw0CVBy2qLBz3fxYUdRJkXlBCETe2g%3D%3D'; /*API 호출 키*/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /*한번에 불러오는 데이터의 양*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지 번호*/
  queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /*사용하는 OS*/
  queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /*프로그램 명*/
  queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('A'); /*정렬기준*/
  queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('39'); /**/
  queryParams += '&' + encodeURIComponent('mapX') + '=' + lon; /*경도*/
  queryParams += '&' + encodeURIComponent('mapY') + '=' + lat; /*위도*/
  queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent('5000'); /*범위 (m단위)*/
  queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /*리스트화 여부 N일시 페이지 수 반환*/
  queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json'); /*JSON형태의 데이터로 호출*/
  xhr.open('GET', url + queryParams);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var obj = xhr.response.response.body.items;
    var i = 0;
    var positions = new Array();
    while (i < obj.item.length) {
      if(!(obj.item[i].title === "현충사")){
        var markerData = {
          title: obj.item[i].title,
          latlng: new kakao.maps.LatLng(obj.item[i].mapy, obj.item[i].mapx),
          content: '<div style="padding:5px">' + obj.item[i].title + '<br>' + obj.item[i].addr1 + '</div>'
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
