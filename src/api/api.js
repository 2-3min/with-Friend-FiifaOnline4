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
  const usersInfo = inputNicknames.map(inputNickname => {

    const url = USERINFO_URL.replace('{nickname}', `${inputNickname}`);
    const user = requestURL(url);

    return user;
  });

  return usersInfo;
}

//각 유저의 100개의 matchKey중 일치하는 matchKey를 추출하는 함수
const getMatchingKeys = matchKeys => {
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
const getMatchesInfo = matchingKeys => {
  const matchesInfo = matchingKeys.map(matchingKey => {
    const url = MATCHINFO_URL.replace('{matchid}', `${matchingKey}`);
    const matchInfo = requestURL(url);

    return matchInfo
  });

  return matchesInfo;
}

//두 유저의 승수를 계산하는 함수
const getMembers = (inputNicknames, pMatches) => {
  const [user1, user2] = inputNicknames;
  console.log(pMatches);
  const member = Promise.all(pMatches).then(matches => {

    const winCounting = matches.reduce((count, match) => {
      const [{nickname, matchDetail: {matchResult}}] = match.matchInfo;

      if(nickname === user1 && matchResult === "승") count++;
      if(nickname !== user1 && matchResult === "패") count++;

      return count;
    }, 0);

    return [
      {nickname: user1, winCount: winCounting}, 
      {nickname: user2, winCount: (pMatches.length - winCounting)}
    ];
  });

  return member;
}

//매치정보를 리턴하는 함수(app.js에서 사용)
const exeSearching = inputNicknames => {
  return getMatchKeys(getUsersInfo(inputNicknames))
  .then(matchKeys => getMatchesInfo(matchKeys))
  .then(pMatches => getMembers(inputNicknames, pMatches))
}


export {exeSearching};