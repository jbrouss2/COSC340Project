const global_leagues = require("../Leagues/global_leagues_db.js")

const { v4: uuidv4 } = require('uuid');

let db = new global_leagues.league_dbmanager;

const get_league = (req, res) => {
    const { id } = req.params;

    db.open();
    db.get_all(id, () => {
        console.log();
        db.close();
    });

    res.send("Got a league's info");
}

const show_all = (req, res) => {
    db.open();
    db.display_all( () => {
        db.close();
    });
}

const create_league = (req, res) => {
    const league = req.body;
    const leagueID = uuidv4();

    const uwid = { ... league, id: leagueID}

    console.log(uwid);

    db.open();
    db.insert(uwid.name,uwid.id,uwid.sport, () =>{
        db.close();
        res.send('League with the name ${uwid.name} added to the database');
    });
}

//figure out where variables for new stuff comes from
const update_name = (req, res) => {
    const { id } = req.params;
    //const new_name = req.body.newName
}

const update_sport = (req, res) => {
    const { id } = req.params;
    //const new_sport = req.body.newSport
}

module.exports = {get_league, show_all, create_league, update_name, update_sport}