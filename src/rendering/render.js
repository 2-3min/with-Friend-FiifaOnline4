//상대전적 계산하는 함수
// const getResult = async(members, pMatches) => {
//   const [user1, user2] = members;
//   let user1_winCount = 0;
//   let user2_winCount = 0;


//   const result = await pMatches.forEach(pMatch => {
//     pMatch.then(match => {
//       if(match.matchInfo[0].nickname === user1.nickname) {
//         console.log("1");
//         match.matchInfo[0].matchDetail.matchResult === "승" ? user1_winCount += 1 : user2_winCount += 1;
//       } else if(match.matchInfo[0].nickname !== user1.nickname) {
//         console.log("2");
//         match.matchInfo[0].matchDetail.matchResult === "승" ? user2_winCount += 1 : user1_winCount += 1;
//       }
//     })
//   });

//   console.log("3");
// }

const renderingHeadtohead = (members, matches) => {
  getResult(members, matches);
  const imagePath = require('../../img/fLogo.PNG');

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

const rederingHistory = (members, matches) => {
  matches.foreach(match => {

  });
}

const renderingSearchForm = () => {
  let template = 
  `<div class="flex h-screen">
    <div class="m-auto">
      <img src="./img/fLogo.PNG"/>
      <form id="search-form" class="flex flex-col">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            User1
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight hover:border-2 hover:border-lime-400" id="user1" type="text" placeholder="짝사앙" value="짝사앙">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            User2
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight hover:border-2  hover:border-lime-400" id="user2" type="text" placeholder="망겜히히" value="망겜히히">
        </div>
        <input class="bg-sky-600 hover:bg-lime-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="enter!">
        </input>
      </form>
    </div>
  </div>`

  root.innerHTML = template;
}


export {renderingSearchForm, renderingHeadtohead, rederingHistory};