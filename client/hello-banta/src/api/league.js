import http from '../http';
import { LEAGUES, LEAGUE, LEAGUETEAMS, LEAGUEGAMES } from '../urls';
import { frameError } from '../services/errors';

const fetchEntity = async (callback, URL,data=null) => {
    try{
        const response = await callback(URL,data)
        return [response.data, null];
    } catch(e) {
        const error = frameError(e);
        return [null, error];
    }
}

const fetchLeagues = async () => {
    return await fetchEntity(http.get, LEAGUES);
}

const fetchLeague = async(league) => {
    return await fetchEntity(http.get, LEAGUE(league));
}

const fetchLeagueTeams = async (league) => {
    return await fetchEntity(http.get, LEAGUETEAMS(league));
}

const fetchLeagueGames = async (league) => {
    return await fetchEntity(http.get, LEAGUEGAMES(league));
}

export {
    fetchLeague,
    fetchLeagueTeams,
    fetchLeagueGames,
    fetchLeagues,
};
