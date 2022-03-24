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
const getUsersInfo = inputNickname => {
  const usersInfo = inputNickname.map(async(inputNickname) => {

    const url = USERINFO_URL.replace('{nickname}', `${inputNickname.nickname}`);
    const user = await requestURL(url);

    inputNickname.level = user.level; //전역 객체인 member에 level property 추가

    return user;
  });

  return usersInfo;
}

//각 유저의 100개의 matchKey중 일치하는 matchKey를 추출하는 함수
const getMatchingKeys = (matchKeys) => {
  const [puser1_MatchKey, puser2_MatchKey] = matchKeys;

  const pmatchingKeys = puser1_MatchKey.then(user1_MatchKey => {

    return puser2_MatchKey.then(user2_MatchKey => {
      const filterMatchKey = user1_MatchKey.filter(matchKey => user2_MatchKey.includes(matchKey));
      return filterMatchKey;
    });

  });

  return pmatchingKeys;
}


//accessKey를 통해 matchKey를 가져오는 함수
const getMatchKeys = usersInfo => {
  const matchKeys = usersInfo.map(userInfo => {

    return userInfo.then(user => {
      const url = MATCHKEY_URL.replace('{accessid}', `${user.accessId}`);
      const matchKeys = requestURL(url);
      return matchKeys;
    })
  });

  return getMatchingKeys(matchKeys);
}


//매치키를 이용하여 매치 정보를 리턴하는 함수
const getMatchesInfo = (matchingKeys) => {
  const matchesInfo = matchingKeys.map(matchingKey => {
    const url = MATCHINFO_URL.replace('{matchid}', `${matchingKey}`);
    const matchInfo = requestURL(url);
    return matchInfo; 
  });

  return matchesInfo;
}

// //매치정보를 리턴하는 함수(app.js에서 사용)
const exeMatches = async(members) => {
  const matchKeys = await getMatchKeys(getUsersInfo(members));
  return getMatchesInfo(matchKeys);
}

export {exeMatches};