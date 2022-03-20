import {API_KEY} from './constant/key/key.js';
import {USERINFO_URL, MATCHKEY_URL, MATCHINFO_URL} from './constant/url.js';


//닉네임으로 accessKey를 가져오는 함수

async function getAccessKey(member) {
  const url = USERINFO_URL.replace('{nickname}', `${member}`);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      'Authorization': API_KEY
    }
  });
  return response;
}

export {getAccessKey};

// export const getAccessKey = async(member) => {
//   const url = USERINFO_URL.replace('{nickname}', `${member}`);
//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       'Authorization': API_KEY
//     }
//   });
//   return response;
// }

// function getAccessKey(members) {
//   let accessInfo = []
//   for(let i = 0; i < members.length; i++){
//     accessInfo[i] = requestFifa(USERINFO_URL.replace('{nickname}', `${members[i].nickname}`));
//     members[i].level = accessInfo[i].level;
//     members[i].accesskey = accessInfo[i].accessId;
//   }

//   return members;
// }

// //두 유저의 MatchKey를 가져오는 함수
// function getMatchKey(members) {
//   let matchKeys = [];
//   for(let i = 0; i < members.length; i++) {
//     MATCHKEY_URL = MATCHKEY_URL.replace('{accessid}', `${members[i].accesskey}`);
//     MATCHKEY_URL = MATCHKEY_URL.replace('{matchtype}', 40); //matchType : 1vs1 스페셜매치
//     matchKeys[i] = requestFifa(MATCHKEY_URL);
//     MATCHKEY_URL = MATCHKEY_URL.replace(`${members[i].accesskey}`, '{accessid}');
//   }
//    //두 유저의 일치하는 매치키 필터링
//   const filterMatchKey = matchKeys[0].filter(ele => matchKeys[1].includes(ele));
//   console.log(filterMatchKey);

//   return filterMatchKey;
// }

// //매치키를 이용하여 매치 정보를 리턴하는 함수
// function getMatchInfo(matchKeys) {
//   let matchInfo = [];
//   for(let matchKey of matchKeys) {
//     matchInfo.push(requestFifa(MATCHINFO_URL.replace('{matchid}', `${matchKey}`))); 
//   }

//   return matchInfo;
// }

// //매치정보를 리턴하는 함수(app.js에서 사용)
// function exeMatchInfo(members) {
//   members = getAccessKey(members);
//   let matchKeys = getMatchKey(members);
//   let matchInfo = getMatchInfo(matchKeys);

//   console.log(matchInfo);
//   return matchInfo;
// }

// export {exeMatchInfo};