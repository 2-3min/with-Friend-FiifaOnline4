const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNDcwMTExNzA4IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY0NTA4NzM3MSwiZXhwIjoxNjYwNjM5MzcxLCJpYXQiOjE2NDUwODczNzF9.I7YVgZX5fZFQlDh3KpRVcQrOJHI6w_3u2WEuFmicL28';

const ajax = new XMLHttpRequest();
const USERINFO_URL = 'https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname={nickname}';
const fifaMembers = ['짝사앙', '망겜히히', '늑대들의질주', '소심한곰탱']

function getAccessKey(members) {
  let accessKey = {};
  for (let member of members) {
    ajax.open('GET', USERINFO_URL.replace('{nickname}', `${member}`), false);
    ajax.setRequestHeader('Authorization', API_KEY);
    ajax.send();
    accessKey[member] = JSON.parse(ajax.response);
  }

  return accessKey;
}

console.log(getAccessKey(fifaMembers));