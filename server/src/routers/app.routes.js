// app.routes.js
const router = require("express").Router();

const { createbet, timer, login, logout, fetchtickets, getBalance, receivables, transferables, receive, transfer, reject, cancel, win, take, winresult, lastresults,lastfiveresult, getBetData, getsocketid, checkdeviceid} = require("../controllers/app.controller");

// Set up socket.io connection


// Post route to create a bet
router.post("/login", login);
router.get("/logout", logout);
router.get("/timer", timer);
router.post("/createbet", createbet);
router.get("/tickets", fetchtickets);
router.get("/getbalance", getBalance);



router.get("/receivables", receivables);
router.get("/transferables", transferables);
router.post("/receive", receive);
router.post("/transfer", transfer);
router.post("/reject", reject);
router.post("/cancel", cancel);




router.get("/win", win);
router.post("/take", take);
router.get("/winresult", winresult);
router.get("/lastresults", lastresults);
router.get("/lastfiveresult", lastfiveresult);

router.get("/getBetData", getBetData);
router.get("/getsocketid", getsocketid);
router.get("/checkdeviceid", checkdeviceid);

module.exports = router;