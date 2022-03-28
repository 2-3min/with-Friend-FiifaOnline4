import {exeMatches} from './api/api.js';
import {renderingSearchForm, renderingHeadtohead, renderingHistory} from './rendering/render.js';
import 'regenerator-runtime/runtime';

renderingSearchForm();

const form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user1 = document.getElementById("user1");
  const user2 = document.getElementById("user2");

  let members = [{
    nickname: user1.value,
    winCount: 0,
  }, {
    nickname: user2.value,
    winCount: 0,
  }];


  exeMatches(members);

});
