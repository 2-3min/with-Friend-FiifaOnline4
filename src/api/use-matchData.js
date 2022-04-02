/*
* 파일명 : use-matchData.js
* 설명 : 매치정보로부터 특정 데이터를 추출하는 함수들이 모인 파일입니다. 
*/

//두 유저의 승수를 계산하는 함수
const getTotalWin = (inputNicknames, matches) => {
    console.log("getMembers 시작!");
    const [user1, user2] = inputNicknames;
    const winCount = matches.reduce((count, match) => {
        const [{nickname, matchDetail: {matchResult}}] = match.matchInfo;
  
        if(nickname === user1 && matchResult === "승") count++;
        if(nickname !== user1 && matchResult === "패") count++;
  
        return count;
    }, 0);
  
    console.log("getMembers 끝!");
      return [
        {nickname: user1, winCount: winCount}, 
        {nickname: user2, winCount: (matches.length - winCount)}
      ];
}

const getMatchingHistory = matches => {
    console.log("getMatchingHistory 시작!");
    console.log("month : ", matches[0].matchDate.substring(5, 7)) // Month
    console.log("day : ", matches[0].matchDate.substring(8, 10)); // Day
    matches.reduce((acc, match)=> {
        const month = match.matchDate.substring(5, 7);
        const day = match.matchDate.substring(8, 10);

        acc[month].push(match);

        return acc;
    },{})
    console.log("getMatchingHistory 끝!");
}

export {getTotalWin, getMatchingHistory};