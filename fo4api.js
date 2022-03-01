//Value about Fifa API 
const ajax = new XMLHttpRequest();
const DATACOUNT = 100;
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDcwMTExNzA4IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY0NTA4NzM3MSwiZXhwIjoxNjYwNjM5MzcxLCJpYXQiOjE2NDUwODczNzF9.I7YVgZX5fZFQlDh3KpRVcQrOJHI6w_3u2WEuFmicL28';
const USERINFO_URL = 'https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname={nickname}';
let MATCHKEY_URL = `https://api.nexon.co.kr/fifaonline4/v1.0/users/{accessid}/matches?matchtype={matchtype}&offset=0&limit=${DATACOUNT}`;
let MATCHINFO_URL = 'https://api.nexon.co.kr/fifaonline4/v1.0/matches/{matchid}';


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
    members[i].level = accessInfo[i].level;
    members[i].accesskey = accessInfo[i].accessId;
  }

  return members;
}

//두 유저의 MatchKey를 가져오는 함수
function getMatchKey(members) {
  let matchKeys = [];
  for(let i = 0; i < members.length; i++) {
    MATCHKEY_URL = MATCHKEY_URL.replace('{accessid}', `${members[i].accesskey}`);
    MATCHKEY_URL = MATCHKEY_URL.replace('{matchtype}', 40); //matchType : 1vs1 스페셜매치
    matchKeys[i] = requestFifa(MATCHKEY_URL);
    MATCHKEY_URL = MATCHKEY_URL.replace(`${members[i].accesskey}`, '{accessid}');
  }
   //두 유저의 일치하는 매치키 필터링
  const filterMatchKey = matchKeys[0].filter(ele => matchKeys[1].includes(ele));
  console.log(filterMatchKey);

  return filterMatchKey;
}

//매치키를 이용하여 매치 정보를 리턴하는 함수
function getMatchInfo(matchKeys) {
  let matchInfo = [];
  for(let matchKey of matchKeys) {
    matchInfo.push(requestFifa(MATCHINFO_URL.replace('{matchid}', `${matchKey}`))); 
  }

  return matchInfo;
}

//매치정보를 리턴하는 함수(app.js에서 사용)
function exeMatchInfo(members) {
  members = getAccessKey(members);
  let matchKeys = getMatchKey(members);
  let matchInfo = getMatchInfo(matchKeys);

  console.log(matchInfo);
  return matchInfo;
}

export {exeMatchInfo};