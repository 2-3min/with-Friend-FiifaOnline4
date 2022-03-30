import {exeSearching} from './api/api.js';
import {renderingSearchForm, renderingHeadtohead, renderingHistory} from './rendering/render.js';
import 'regenerator-runtime/runtime';

renderingSearchForm();

const form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user1 = document.getElementById("user1");
  const user2 = document.getElementById("user2");

  let inputNicknames = [user1.value, user2.value];

  exeSearching(inputNicknames).then(members => {
    renderingHeadtohead(members);
  });
});
