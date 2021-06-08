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
  var imagelink = path.firstimage;
  var tel = path.tel;
  var title = path.title;
  var contid = path.contentid;
  var conttype = path.contenttypeid;

  document.getElementById('title').innerText = path.title;
  document.getElementById('tourimg').src = imagelink;

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
}
xhr.send('');
