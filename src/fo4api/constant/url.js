import { DATACOUNT } from "./constant";

//Value about Fifa API
const USERINFO_URL = 'https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname={nickname}';
let MATCHKEY_URL = `https://api.nexon.co.kr/fifaonline4/v1.0/users/{accessid}/matches?matchtype={matchtype}&offset=0&limit=${DATACOUNT}`;
let MATCHINFO_URL = 'https://api.nexon.co.kr/fifaonline4/v1.0/matches/{matchid}';

export {USERINFO_URL, MATCHKEY_URL, MATCHINFO_URL};