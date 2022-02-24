const ajax = new XMLHttpRequest();
const content = document.getElementById('content');
const DATACOUNT = 100;
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDcwMTExNzA4IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY0NTA4NzM3MSwiZXhwIjoxNjYwNjM5MzcxLCJpYXQiOjE2NDUwODczNzF9.I7YVgZX5fZFQlDh3KpRVcQrOJHI6w_3u2WEuFmicL28';
const USERINFO_URL = 'https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname={nickname}';
let MATCHKEY_URL = `https://api.nexon.co.kr/fifaonline4/v1.0/users/{accessid}/matches?matchtype={matchtype}&offset=0&limit=${DATACOUNT}`;
let MATCHINFO_URL = 'https://api.nexon.co.kr/fifaonline4/v1.0/matches/{matchid}';


const form = document.getElementById("search-form");
const user1 = document.getElementById("user1");
const user2 = document.getElementById("user2");

let userArr = [];

//API 요청
function requestFifa(url) {
  ajax.open('GET', url, false);
  ajax.setRequestHeader('Authorization', API_KEY);
  ajax.send();

  const res = JSON.parse(ajax.response);

  return res
}

//닉네임으로 accessKey를 가져오는 함수
function getAccessKey(members) {
  let accessInfo = []
  for(let i = 0; i < members.length; i++){
    accessInfo[i] = requestFifa(USERINFO_URL.replace('{nickname}', `${members[i].nickname}`));
    userArr[i].level = accessInfo[i].level;
    userArr[i].accesskey = accessInfo[i].accessId;
  }

  console.log(userArr);
}

function getMatchKey(members) {
  let matchKeys = [];
  for(let i = 0; i < members.length; i++) {
    MATCHKEY_URL = MATCHKEY_URL.replace('{accessid}', `${members[i].accesskey}`);
    MATCHKEY_URL = MATCHKEY_URL.replace('{matchtype}', 40); //matchType : 1vs1 스페셜매치
    matchKeys[i] = requestFifa(MATCHKEY_URL);
    MATCHKEY_URL = MATCHKEY_URL.replace(`${members[i].accesskey}`, '{accessid}');
  }
  const filterMatchKey = matchKeys[0].filter(ele => matchKeys[1].includes(ele));

  console.log(filterMatchKey);

  return filterMatchKey;
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  userArr = [{nickname: user1.value}, {nickname: user2.value}];
  getAccessKey(userArr);
  getMatchKey(userArr);
});
