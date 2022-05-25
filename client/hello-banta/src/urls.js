// const BASE_URL = "127.0.0.1:3000/api";
const BASE_URL = "http://localhost:3000/api";

export const LEAGUES = `${BASE_URL}/leagues`;
export const LEAGUE = (league) => `${LEAGUES}/${league}`;
export const LEAGUETEAMS = (league) => `${LEAGUE(league)}/teams`;
export const LEAGUEGAMES = (league) => `${LEAGUE(league)}/games`;