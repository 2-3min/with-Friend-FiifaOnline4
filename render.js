//상대전적 계산하는 함수
function getResult(members, matches) {
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
}

function getRecord(members, matches) {

}


function renderResult(members, matches) {
  getResult(members, matches);
  console.log(members);
  const imagePath = require('./img/fLogo.PNG');

  const root = document.getElementById('root');
  let template = `
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <!--card-->
          <div class="flex justify-center my-4">
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-slate-500 flex" style="width: 280px">
              <div class="flex-auto px-6 py-4">
                <div class="font-bold text-xl text-white mb-2">${members[0].nickname}</div>
                <div class="flex-auto font-bold text-xl text-lime-300 mb-2">
                  <span class="italic font-bold text-xl text-lime-300 mb-2">Lv.</span>
                  <span class="font-bold text-xl text-white mb-2">${members[0].level}</span>
                </div>
              </div>
              <div class="flex-auto px-4 py-4">
                <img class="w-20 h-20" src="${imagePath}">
              </div>
            </div>
            <span class="italic font-bold text-xl text-lime-300 mb-2 px-4 my-8">VS</span>
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-slate-500 flex" style="width: 280px">
              <div class="flex-auto px-6 py-4">
                <div class="font-bold text-xl text-white mb-2">${members[1].nickname}</div>
                <div class="flex-auto font-bold text-xl text-lime-300 mb-2">
                  <span class="italic font-bold text-xl text-lime-300 mb-2">Lv.</span>
                  <span class="font-bold text-xl text-white mb-2">${members[1].level}</span>
                </div>
              </div>
              <div class="flex-auto px-4 py-4">
                <img class="w-20 h-20" src="${imagePath}">
              </div>
            </div>
          </div>
        <!--table-->
          <div class="overflow-hidden shadow-md sm:rounded-lg">
              <table class="min-w-full">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                      <tr>
                          <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"></th>
                          <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              ${members[0].nickname} WINS
                          </th>
                          <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              DRAWS
                          </th>
                          <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              ${members[1].nickname} WINS
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <!-- Product 1 -->
                      <tr class="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Special Match 1 ON 1
                          </td>
                          <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          ${members[0].winCount}
                          </td>
                          <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          ${members[0].drawCount}
                          </td>
                          <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          ${members[1].winCount}
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</div>
  `
  root.innerHTML = template;
}

export {renderResult};