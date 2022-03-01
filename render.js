//상대전적 계산하는 함수
function getRecord(members, matches) {
  const [user1, user2] = members;

  matches.forEach(match => {
    if(match.matchInfo[0].matchDetail.matchResult === "몰수패" || match.matchInfo[0].matchDetail.matchResult === "몰수승") {
      console.log("몰수");
      return;
    }

    if(match.matchInfo[0].matchDetail.matchResult === "무") {
      user1.drawCount += 1;
      user2.drawCount += 1;
      return;
    }

    if(match.matchInfo[0].nickname === user1.nickname) {
      match.matchInfo[0].matchDetail.matchResult === "승" ? user1.winCount += 1 : user2.winCount += 1;
    } else if(match.matchInfo[0].nickname !== user1.nickname) {
      match.matchInfo[0].matchDetail.matchResult === "승" ? user2.winCount += 1 : user1.winCount += 1;
    }
    
  });

  user1.loseCount = user2.winCount;
  user2.loseCount = user1.winCount;
}

function renderResult(members, matches) {
  getRecord(members, matches);

  const root = document.getElementById('root');
  let template = `
    <div>
      <h1>Head to head</h1>
      <h1>${members[0].nickname} vs ${members[1].nickname}</h1>
    </div>
  `
  root.innerHTML = template;
}

export {renderResult};