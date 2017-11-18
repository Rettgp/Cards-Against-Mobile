"use strict";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const rp = require('request-promise');
// const promisePool = require('es6-promise-pool');
// const PromisePool = promisePool.PromisePool;
const secureCompare = require('secure-compare');
// const MAX_CONCURRENT = 3;

// Cut off time. Child nodes older than this will be deleted.
const CUT_OFF_TIME = 48 * 60 * 60 * 1000; // 48 hours in milliseconds.

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://cah-mobile.firebaseio.com"
});
exports.GameCleanup = functions.https.onRequest((req, res) => {
  const key = req.query.key;

    // Exit if the keys don't match
    if (!secureCompare(key, functions.config().cron.key)) {
        console.log('The key provided in the request does not match the key set in the environment. Check that', key,
            'matches the cron.key attribute in `firebase env:get`');
        res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
            'cron.key environment variable.');
        return;
    }


    const now = Date.now();
    const cutoff = now - CUT_OFF_TIME;
    const ref = admin.database().ref();
    const oldItemsQuery = ref.orderByChild("timestamp").endAt(cutoff);
    return oldItemsQuery.once("value").then(snapshot => {
        // create a map with all children that need to be removed
        const updates = {};
        snapshot.forEach(child => {
            updates[child.key] = null;
        });
        // execute all updates in one go and return the result to end the function
        res.send('Game cleanup finished');
        return ref.update(updates);
    });

});