import express from "express";
import fs from "fs";

const router = express.Router();

router.get('/', function(req, res, next) {
    let data = JSON.parse(fs.readFileSync('./DATA/leagues.json', 'utf-8'));
    data = data.filter(e => !e.is_team);
    res.send(data);
});

router.get('/:name', (req, res, next) => {
    const name = req.params['name'];
    let data = JSON.parse(fs.readFileSync('./DATA/leagues.json', 'utf-8'));
    const league = data.find(e => e['slug'] === name);
    res.send(league)
});

router.get('/:name/teams', (req, res, next) => {
    const name = req.params['name'];
    let data = JSON.parse(fs.readFileSync('./DATA/teams.json', 'utf-8'));
    const teams = data.filter(e => e['league'] === name);
    res.send(teams )
});

router.get('/:name/games', (req, res, next) => {
    const name = req.params['name'];
    let games = JSON.parse(fs.readFileSync('./DATA/gamees.json', 'utf-8'));
    games = games.filter(i => i['league'] === name)
    res.send(games)
});

export default router;
