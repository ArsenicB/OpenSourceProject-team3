var mainCity = document.querySelector('.city');

mainCity.onchange = function() {
  var subCity = document.querySelector('.country');
  var mainOption = mainCity.options[mainCity.selectedIndex].innerText;

  var subOptions = {
    select: ['::선택::'],
    seoul: ['::선택::', '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
    busan: ['::선택::', '강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
    daegu: ['::선택::', '남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
    incheon: ['::선택::', '강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '옹진군', '중구'],
    gwangju: ['::선택::', '광산구', '남구', '동구', '북구', '서구'],
    daejeon: ['::선택::', '대덕구', '동구', '서구', '유성구', '중구'],
    ulsan: ['::선택::', '남구', '동구', '북구', '울주군', '중구'],
    sejong: []
  }

  switch (mainOption) {
    case ':: 시/도 ::':
      var subOption = subOptions.select;
      break;
    case '서울특별시':
      var subOption = subOptions.seoul;
      break;
    case '부산광역시':
      var subOption = subOptions.busan;
      break;
    case '대구광역시':
      var subOption = subOptions.daegu;
      break;
    case '인천광역시':
      var subOption = subOptions.incheon;
      break;
    case '광주광역시':
      var subOption = subOptions.gwangju;
      break;
    case '대전광역시':
      var subOption = subOptions.daejeon;
      break;
    case '울산광역시':
      var subOption = subOptions.ulsan;
      break;
    case '세종특별자치시':
      var subOption = subOptions.sejong;
      document.getElementById("county1").disabled = false;
      break;
    case '경기도':
      var subOption = subOptions.gyeonggi;
      break;
    case '강원도':
      var subOption = subOptions.gangwondo;
      break;
    case '충청북도':
      var subOption = subOptions.chungcheongbukdo;
      break;
    case '충청남도':
      var subOption = subOptions.chungcheongnamdo;
      break;
    case '전라북도':
      var subOption = subOptions.
      break;
    case '전라남도':
      var subOption = subOptions.
      break;
    case '경상북도':
      var subOption = subOptions.
      break;
    case '경상남도':
      var subOption = subOptions.
      break;
    case '제주특별자치도':
      var subOption = subOptions.
      break;
  }

  subCity.options.length = 0;

  for (var i = 0; i < subOption.length; i++) {
    var option = document.createElement('option');
    option.innerText = subOption[i];
    subCity.append(option);
  }
}
