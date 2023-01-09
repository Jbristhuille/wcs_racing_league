/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-01-03 15:16:12
 * @ Description: Handle match endpoint requests
 */

/* SUMMARY
    * Imports
    * Name: add
*/

/* Imports */
const matchModel = require('../models/match.model');
const ws = require('../services/websocket.service');
/***/

/*
* Name: add
* Description: Add match result
*
* Body;
* - winner (Object): Winner's data
*   - id (Number): Winner's id
* - loser (Object): Loser's data
*   - id (Number): Loser's id
*/
const add = async (req, res) => {
    try {
        const {winner, loser, target} = req.body;
        let [result] = await matchModel.insert(winner.id, loser.id);

        let s = ws.findSocket(target);
        if (s) {
            s.socket.emit('confirm', {
                id: result.insertId,
                winner: winner,
                loser: loser
            });
        }

        return res.status(201).send();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
};
/***/

/*
* Name: result
* Description: Confirm or contest results
*
* Params:
* - id (String): Match's id
*
* Body:
* - result (Boolean): Confirm or contest
*/
const result = (req, res) => {
    try {
        return res.status(200).send();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur inconnue est survenu');
    }
};
/***/

module.exports = {
    add,
    result
};