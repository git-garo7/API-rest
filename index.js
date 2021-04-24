const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

var DB = {

    games:[
        {
            id:23,
            title: "crash bandicoot",
            year: 1996,
            price: 100 

        },
        {
            id:73,
            title: "call of duty mw",
            year: 2019,
            price: 60 

        },
        {
            id:11,
            title: "minecraft",
            year: 1996,
            price: 1000 

        }
    ]

}//um banco de dados falso,futuramente implementar o sequelize.

app.get("/games",(req,res)=>{// (/games)= a listagem de jogos citados
    res.statusCode = 200; // 200 = requisição com sucesso,erro é 404/403.
    res.json(DB.games);
});//rota *get*=pega dados e exibe na tela

app.get("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
       var id = parseInt(req.params.id);
       var games = DB.games.find(g => g.id == id);
       if(game != undefined){
           res.statusCode = 200;
           res.json(game);
       }else{
           res.sendStatus(404);
       }
    }
});

//cadastra o jogo
app.post("/game",(req,res) => {
    
    var{title,price,year} = req.body;

    DB.games.push({
        id: 2323,
        title,
        price,
        year
    });//adc dados ao array.
    res.sendStatus(200);
     
})

app.delete("/game/:id",(req,res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
       var id = parseInt(req.params.id);
       var index = DB.games.findIndex(g => g.id == id);

       if(index == -1){
        res.sendStatus(404);
       }else{
           DB.games.splice(index,1);
           res.sendStatus(200);
       }
       
    }

});

app.put("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
       var id = parseInt(req.params.id);
       var game = DB.games.find(g => g.id == id);
       if(game != undefined){

        var{title,price,year} = req.body;

        if(title !=undefined){
            game.title = title;

        }
        if(price !=undefined){
            game.price = price;
        }
        if(year !=undefined){
            game.year = year;
        }

        res.sendStatus(200);
           
       }else{
           res.sendStatus(404);
       }
    }
})


app.listen(3773,()=>{
    console.log("API RODOU");
});//servidor