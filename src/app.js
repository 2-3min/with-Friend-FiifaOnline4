import {matchesInfo} from './api/matchData.js';
import {getTotalWin, getMatchingHistory} from './api/use-matchData.js';
import {renderingSearchForm, renderingHeadtohead, renderingHistory} from './rendering/render.js';
import 'regenerator-runtime/runtime';

renderingSearchForm();

const form = document.getElementById("search-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user1 = document.getElementById("user1");
  const user2 = document.getElementById("user2");

  let inputNicknames = [user1.value, user2.value];

  const prom_matchesInfo = matchesInfo(inputNicknames);

  prom_matchesInfo.then(matchesInfo => {
    renderingHeadtohead(getTotalWin(inputNicknames, matchesInfo));
    // getMatchingHistory(matchesInfo);
  });
});