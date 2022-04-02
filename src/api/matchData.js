/*
* 파일명 : matchData.js
* 설명 : 사용자로부터 두 유저의 닉네임의 입력 값을 받아, 두 유저 간의 매칭 데이터를 리턴하는 파일입니다.
* input : inputNicknames
* return : Matching data of two users
*/
import {API_KEY} from './constant/key/key.js';
import {USERINFO_URL, MATCHKEY_URL, MATCHINFO_URL} from './constant/url.js';

//fetch 함수
const requestURL = url => {
  const prom = fetch(url, {
    method: "GET",
    headers: {
      'Authorization': API_KEY
    }
  }).then(response => {
    return response.json();
  })


  return prom;
}

//닉네임으로 유저정보와 accessId를 가져오는 함수
const getUsersInfo = inputNicknames => {
  console.log("getUsersInfo 시작!");
  const usersInfo = inputNicknames.map(inputNickname => {

    const url = USERINFO_URL.replace('{nickname}', `${inputNickname}`);
    const user = requestURL(url);

    return user;
  });

  console.log("getUsersInfo 끝!");
  return usersInfo;
}

//각 유저의 100개의 matchKey중 일치하는 matchKey를 추출하는 함수
const getMatchingKeys = matchKeys => {
  console.log("getMatchingKeys 시작!");
  const [puser1_MatchKey, puser2_MatchKey] = matchKeys;

  const pmatchingKeys = puser1_MatchKey.then(user1_MatchKey => {

    return puser2_MatchKey.then(user2_MatchKey => {
      const filterMatchKey = user1_MatchKey.filter(matchKey => user2_MatchKey.includes(matchKey));
      return filterMatchKey;
    });

  });

  console.log("getMatchingKeys 끝!");
  return pmatchingKeys;
}

//accessKey를 통해 matchKey를 가져오는 함수
const getMatchKeys = usersInfo => {
  console.log("getMatchKeys 시작!");
  const matchKeys = usersInfo.map(userInfo => {

    return userInfo.then(user => {
      const url = MATCHKEY_URL.replace('{accessid}', `${user.accessId}`);
      const matchKeys = requestURL(url);
      return matchKeys;
    })
  });

  console.log("getMatchKeys 끝!");
  return getMatchingKeys(matchKeys);
}

//매치키를 이용하여 매치 정보를 리턴하는 함수
const getMatchesInfo = matchingKeys => {
  console.log("getMatchesInfo 시작!");
  const matchesInfo = Promise.all(matchingKeys.map(matchingKey => {
    const url = MATCHINFO_URL.replace('{matchid}', `${matchingKey}`);
    const matchInfo = requestURL(url);

    return matchInfo
  }));

  console.log("getMatchesInfo 끝!", matchesInfo);
  return matchesInfo;
}

//매치정보를 리턴하는 함수(app.js에서 사용)
const matchesInfo = inputNicknames => {
  return getMatchKeys(getUsersInfo(inputNicknames))
  .then(matchKeys => getMatchesInfo(matchKeys))
}


export {matchesInfo};