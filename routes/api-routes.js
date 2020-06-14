const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFileSync);
router.get("/api", (req, res) => {
    res.json({ msg: "Success" });
});

router.get("/api/all", async (req, res) => {
    let pokemonData = await readFile("data.json");
    pokemonData = JSON.parse(pokemonData);
    //we dont need to write anything just read from the file and parse the json data
    // await writeFileSync("data.json", JSON.stringify(pokemonData, null, 2));
    res.json(pokemonData);
    // let data = fs.readFileSync("data.json", "utf8");
    // data = JSON.parse(data);
    // res.json(data.pokemon);
});

router.post("/api/add", (req, res) => {
    res.json(req.body);
});
module.exports = router;