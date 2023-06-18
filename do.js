const Shikimori = require("node-shikimori-api");
const fs = require('fs');

const shiki = new Shikimori();
var json_files=["files/(C3H7O)2PtCl6_animes.json","files/(C3H7O)2PtCl6_mangas.json"]
function getId(src){
    var content=JSON.parse(fs.readFileSync(src))
    var content_id= new Array;
    for (var i in content){
        content_id[i]=content[i].target_id
    }
    console.log(content_id)
    return content_id
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function myFunction() {
    console.log('Начало');
    await sleep(1500); // Приостановка выполнения на 3 секунды
    console.log('Конец');
}
  
// myFunction();

var animes_id=getId(json_files[0]);
var mangas_id=getId(json_files[1]);

// shiki.api.animes({ // делаем запрос на https://shikimori.org/api/users/Syleront
//     anime_id: "53393"
//   }).then((res) => {
//     console.log(res)
//     fs.appendFileSync("out.txt",JSON.stringify(res))
//   }).catch((err) => {
//     console.log(err)
//   });


  shiki.api.mangas({ // делаем запрос на https://shikimori.org/api/users/Syleront
    anime_id: "131041"
  }).then((res) => {
    console.log(res)
    console.log(res.name, res.russian, res.english, res.japanese)
    fs.appendFileSync("out2.txt",JSON.stringify(res))
  }).catch((err) => {
    console.log(err)
  });


// var name_anime=new Object;

// for (var id of animes_id){
//     name_anime[id]={}
//     shiki.api.animes({ // делаем запрос на https://shikimori.org/api/users/Syleront
//         anime_id: id
//     }).then((res) => {
//         console.log(id,res.russian,res.english,res.japanese)
//         name_anime[id]={russian:res.russian,english:res.english,japanese:res.japanese}
//          fs.appendFileSync("out.txt",JSON.stringify(res))
//         myFunction()
//         console.log(name_anime)
//     }).catch((err) => {
//         console.log(err)
//         myFunction()
//     });
    
// }
// fs.appendFileSync("name_anime.json",JSON.stringify(name_anime))