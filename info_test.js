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
  var addr = path.addr1;
  var latlng = new kakao.maps.LatLng(path.mapy, path.mapx);
  var tel = path.tel;
  var title = path.title;
  var contid = path.contentid;
  var conttype = path.contenttypeid;

  document.getElementById('title').innerText = path.title;
  document.getElementById('tourimg').src = path.firstimage;

  var xhr_ = new XMLHttpRequest();
  var url_ = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon'; /*URL*/
  var queryParams_ = '?' + encodeURIComponent('ServiceKey') + '=' + 'Qmxlp4pFKUj9NMkhZTxOAlYfvf2Jk%2BPbu3nT8soq5iibgzkV92lHdPtbQw0CVBy2qLBz3fxYUdRJkXlBCETe2g%3D%3D'; /*Service Key*/
  queryParams_ += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
  queryParams_ += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  queryParams_ += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC');
  queryParams_ += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest');
  queryParams_ += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(contid);
  queryParams_ += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(conttype);
  queryParams_ += '&' + encodeURIComponent('overviewYN') + '=' + encodeURIComponent('Y');
  queryParams_ += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
  xhr_.open('GET', url_ + queryParams_);

  xhr_.responseType = 'json';
  xhr_.onload = function() {
    var path_ = xhr_.response.response.body.items.item;
    document.getElementById('tourinfo').innerHTML = path_.overview;
  }
  xhr_.send('');

	var mapContainer1 = document.getElementById('map1');
	var mapOption1 = {
		center: latlng,
		level:5
	}
	var map1 = new kakao.maps.Map(mapContainer1, mapOption1);
	tourapicall(latlng.getLat(), latlng.getLng(), map1);
	var marker = new kakao.maps.Marker({
		position:latlng
	});
	marker.setMap(map1);
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
	        latlng: new kakao.maps.LatLng(obj.item[i].mapy, obj.item[i].mapx)
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
    }

  }
  xhr.send('');
}
