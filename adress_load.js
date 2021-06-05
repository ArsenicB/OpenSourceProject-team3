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
    sejong: ['::선택::'],
    gyeonggi:['::선택::', '가평군', '고양시 덕양구', '고양시 일산동구', '고양시 일산서구' , '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시 분당구', '성남시 수성구', '성남시 중원구', '수원시 권선구', '수원시 영통구',
     '수원시 장안구', '수원시 팔달구', '시흥시', '안산시 단원구', '안산시 상록구', '안성시', '안양시 동안구', '안양시 만안구', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시 기흥구', '용인시 수지구', '용인시 처인구', '의왕시', '의정부시', '이천시', '파주시',
     '평택시', '포천시', '하남시', '화성시'],
    gangwon: ['::선택::', '강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군'],
    chungbuk: ['::선택::'],
    chungnam: ['::선택::'],
    jeonbuk: ['::선택::'],
    jeonnam: ['::선택::'],
    gyeongbuk: ['::선택::'],
    gyeongnam: ['::선택::'],
    jeju: ['::선택::']
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
