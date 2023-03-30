const global_users = require("../Users/global_users_db.js");
const { hash_data } = require("../Users/hash.js");

const { v4: uuidv4 } = require('uuid');

let db = new global_users.users_dbmanager;

const get_path = (callback) => {
    const pwd = process.cwd();
    let db_path = pwd;
    db_path = db_path + "\\DreamTeam\\Back-End\\database.db";
    db_path = db_path.replace(/\\/g,"/");

    callback(db_path);
}

const get_user = (req, res) => {
    const { id } = req.params;

    get_path( (path) => {
        db.open(path);
        db.get_all(id, (username,first_name,last_name,email,bio,pos) => {
            console.log(username + " " + first_name + " " + last_name + " " + email + " " + bio + " " + pos)
            db.close();
        });
    });

    res.send("Got a user's info");
}

const show_all = (req, res) => {

    get_path( (path) => {
        db.open(path);
        db.display_all( () => {
            console.log("in controllers: " + path)
            db.close();
        });
    });

    res.send("read all");
}

const create_user = (req, res) => {
    get_path( (path) => {
        const user = req.body;
        const userID = uuidv4();
  
        //adds unique ID to the user
        const uwid = { ... user, id: userID}

        console.log(uwid);

        let hash_pass = hash_data(uwid.password);
        uwid.password = hash_pass;

        //let hash_email = hash_data(uwid.email);
        //uwid.email = hash_email;

        db.open(path);
        db.insert(uwid.id,uwid.username,uwid.email,uwid.password,uwid.firstName,uwid.lastName,uwid.bio,uwid.position,null, () => {
            db.close();
            res.send(`User with the name ${uwid.firstName} added to the database`);
        });
    });
}

const delete_user =  (req, res) => {
    const { id } = req.params;

    get_path( (path) => {
        db.open(path);
        db.delete_user(id, () => {
            db.close();
            res.send(`User with the id ${id} deleted`);
        });
    });
}

const update_username = (req, res) => {
    const { id } = req.params;
    const new_username = req.body.newUsername;

    console.log(new_username + " " + id);

    db.open(db_path);
    db.update_user_name(new_username,id, () => {
        db.close();
    });

    res.send('Username updated');
}

const update_email = (req, res) => {
    const { id } = req.params;
    const new_email = req.body.newEmail;

    console.log(new_email + " " + id);

    db.open(db_path);
    db.update_email(new_email,id, () => {
        db.close();
    });

    res.send('Email updated');
}

const update_bio = (req, res) => {
    const { id } = req.params;
    const new_bio = req.body.newBio;

    console.log(new_bio + " " + id);

    db.open(db_path);
    db.update_bio(new_bio,id, () => {
        db.close();
    });

    res.send('Bio updated');
}

const update_lastname = (req, res) => {
    const { id } = req.params;
    const new_lastname = req.body.newLastname;

    console.log(new_lastname + " " + id);

    db.open(db_path);
    db.update_last_name(new_lastname,id, () => {
        db.close();
    });

    res.send('Lastname updated');
}

module.exports = { get_user, show_all, create_user, delete_user, update_lastname, update_username, update_email, update_bio }