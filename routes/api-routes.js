const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFileSync);
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

router.post("/api/add", async (req, res) => {
    res.send(req.body);
    let data = await readFile("data.json");
    //parse the file so that we can add to the file or else it will be a string
    data = JSON.parse(data);
    data.pokemon.push(req.body);
    console.log(data);
    await writeFile("data.json", JSON.stringify(data, null, 3));
    res.json(data.pokemon);
});

router.post("/api/new", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8");
    data = JSON.parse(data);

    let id = data.pokemon.length + 1;

    const { name, type, moves } = req.body;

    data.pokemon.push({ name, type, moves, id });

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.send({ message: "Added Pokemon" });
});
// router.delete("/api/delete/:id", async (req, res) => {
//     const des = await readFile("data.json");
//     des.destroy({ where: { id: req.params.id } }).then(() => 'deleted pokemon');

//     res.json({msg: "deleted successfully"});

// });
module.exports = router;