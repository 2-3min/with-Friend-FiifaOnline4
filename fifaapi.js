const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDcwMTExNzA4IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY0NTA4NzM3MSwiZXhwIjoxNjYwNjM5MzcxLCJpYXQiOjE2NDUwODczNzF9.I7YVgZX5fZFQlDh3KpRVcQrOJHI6w_3u2WEuFmicL28';
const DATACOUNT = 15;

const ajax = new XMLHttpRequest();
const content = document.getElementById('content');
const USERINFO_URL = 'https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname={nickname}';
let MATCHKEY_URL = `https://api.nexon.co.kr/fifaonline4/v1.0/users/{accessid}/matches?matchtype={matchtype}&offset=0&limit=${DATACOUNT}`;
let MATCHINFO_URL = 'https://api.nexon.co.kr/fifaonline4/v1.0/matches/{matchid}';
const fifaMembers = ['짝사앙', '망겜히히', '늑대들의질주', '소심한곰탱', 'bbbbaaaammm']


//API 요청
function requestFifa(url) {
  ajax.open('GET', url, false);
  ajax.setRequestHeader('Authorization', API_KEY);
  ajax.send();

  return JSON.parse(ajax.response);
}

//닉네임으로 accessKey를 가져오는 함수
function getAccessKey(members) {
  let accessKeys = [];
  for(let i = 0; i < fifaMembers.length; i++)
    accessKeys[i] = requestFifa(USERINFO_URL.replace('{nickname}', `${fifaMembers[i]}`));

  return accessKeys;
}

//최근 20경기 매치키를 가져오는 함수
function getMatchKey(accessKeys) {
  let matchKeys = [];
  for(let i = 0; i < accessKeys.length; i++) {
    MATCHKEY_URL = MATCHKEY_URL.replace('{accessid}', `${accessKeys[i].accessId}`);
    MATCHKEY_URL = MATCHKEY_URL.replace('{matchtype}', 40); //matchType : 1vs1 스페셜매치
    console.log(MATCHKEY_URL);
    matchKeys[i] = requestFifa(MATCHKEY_URL);
    MATCHKEY_URL = MATCHKEY_URL.replace(`${accessKeys[i].accessId}`, '{accessid}');
  }
  console.log("getMatchKey Return : ", matchKeys);
  return matchKeys;
}

//매치키로 매치정보를 가져오는 함수
function getMatchInfo(matchKeys) {
  let MatchInfo = Array.from(Array(matchKeys.length), () => new Array(DATACOUNT));
  for(let i=0; i<matchKeys.length; i++) {
    for(let j=0; j<DATACOUNT; j++) {
      MATCHINFO_URL = MATCHINFO_URL.replace('{matchid}', `${matchKeys[i][j]}`);
      MatchInfo[i][j] = requestFifa(MATCHINFO_URL);
      MATCHINFO_URL = MATCHINFO_URL.replace(`${matchKeys[i][j]}`, '{matchid}');
    }
  }
  console.log("MatchInfo", MatchInfo);
  return MatchInfo;
}


// function makeTable() {

// }

// function LeagueTable() {
//   let test = `
//   <div class="flex flex-col">
//     <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
//             <div class="overflow-hidden shadow-md sm:rounded-lg">
//                 <table class="min-w-full">
//                     <thead class="bg-gray-50 dark:bg-gray-700">
//                         <tr>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 Position
//                             </th>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 Club
//                             </th>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 Played
//                             </th>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 Won
//                             </th>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 Drown
//                             </th>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 Lost
//                             </th>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 GF
//                             </th>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 GA
//                             </th>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 GD
//                             </th>
//                             <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 dark:text-gray-400">
//                                 Points
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <!-- Product 1 -->
//                         <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                             <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                 1
//                             </td>
//                             <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
//                                 Mancity
//                             </td>
//                             <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
//                                 25
//                             </td>
//                             <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
//                                 20
//                             </td>
//                             <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
//                                 3
//                             </td>
//                             <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
//                                 2
//                             </td>
//                             <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
//                                 61
//                             </td>
//                             <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
//                                 14
//                             </td>
//                             <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
//                                 47
//                             </td>
//                             <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
//                                 63
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>
//   </div>
// `  
// }

// content.innerHTML = yulgeonTable;

// const accessKeys = getAccessKey(fifaMembers);
// const matchKeys = getMatchKey(accessKeys);
// getMatchInfo(matchKeys);