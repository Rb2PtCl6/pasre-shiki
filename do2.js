const Shikimori = require("node-shikimori-api");
const fs = require('fs');

var json_files = ["files/(C3H7O)2PtCl6_animes.json", "files/(C3H7O)2PtCl6_mangas.json"];

function getId(src) {
    var content = JSON.parse(fs.readFileSync(src));
    var content_id = [];
    for (var i in content) {
        content_id[i] = content[i].target_id;
    }
    console.log(content_id);
    return content_id;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function myFunction() {
    console.log('Начало');
    await sleep(1500); // Приостановка выполнения на 3 секунды
    console.log('Конец');
}

async function fetchData() {
    var animes_id = getId(json_files[0]);
    var mangas_id = getId(json_files[1]);

    var name_anime = {};

    for (var id of animes_id) {
        name_anime[id] = {};
        const shiki = new Shikimori();
        await shiki.api.animes({
            anime_id: id
        }).then((res) => {
            console.log(id, res.russian, res.english, res.japanese);
            name_anime[id] = {
                name: res.name,
                russian: res.russian,
                english: res.english,
                japanese: res.japanese,
                synonyms: res.synonyms
            };
            //console.log(name_anime);
        }).catch((err) => {
            console.log(err);
        });
        await myFunction();
    }
    fs.appendFileSync("name_anime.json", JSON.stringify(name_anime));
}

fetchData().catch((err) => {
    console.log(err);
});

  