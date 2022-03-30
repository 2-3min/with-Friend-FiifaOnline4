
const renderingHeadtohead = members => {
  const [user1, user2] = members;
  const imagePath = require('../../img/fLogo.PNG');

  const root = document.getElementById('root');
  console.log(members);
  let template = `
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <!--card-->
          <div class="flex justify-center my-4">
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-slate-500 flex" style="width: 280px">
              <div class="flex-auto px-6 py-4">
                <div class="font-bold text-xl text-white mb-2">${user1.nickname}</div>
              </div>
              <div class="flex-auto px-4 py-4">
                <img class="w-20 h-20" src="${imagePath}">
              </div>
            </div>
            <span class="italic font-bold text-xl text-lime-300 mb-2 px-4 my-8">VS</span>
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-slate-500 flex" style="width: 280px">
              <div class="flex-auto px-6 py-4">
                <div class="font-bold text-xl text-white mb-2">${user2.nickname}</div>
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
                              ${user1.nickname} WINS
                          </th>
                          <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              ${user2.nickname} WINS
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
                          ${user1.winCount}
                          </td>
                          <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          ${user2.winCount}
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