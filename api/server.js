const express = require('express');
const app = express();
const redis = require('redis')
const client = redis.createClient();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

client.on("error", function (err) {
	console.log('erro ao conectar')
});

client.on("connect", function (err) {
	console.log('Sucesso ao conectar')
});

app.post('/zadd/', (req,res) =>{
	client.zadd("players", req.body.pontos,req.body.nome, (err, reply) => {
		if(reply === 1)
			res.sendStatus(200)
		else{
			res.sendStatus(500)
		}
	})
});

app.post('/listagem/', (req,res) =>{
	client.zrange("players", req.body.rank, -1, "WITHSCORES", (err, reply) => {
		var lista = [];
		for(var i = reply.length-1; i >0 ; i -= 2){
			lista.push({nome: reply[i-1], pontos: reply[i]})
		}
		res.send(lista)
	})
});

app.post('/posicao/', (req,res) =>{
	client.zrange("players", req.body.posicao*-1,req.body.posicao*-1 , "WITHSCORES", (err, reply) => {
		res.send({posicao:req.body.posicao, nome:reply[0], pontos: reply[1]})
	})
});

app.post('/zincre/', (req,res) =>{
	client.zadd("players", "INCR",req.body.pontos,req.body.nome, (err, reply) => {
		client.zrange("players", 0, -1, "WITHSCORES", (err, reply) => {
			var lista = [];
			for(var i = reply.length-1; i >0 ; i -= 2){
				lista.push({nome: reply[i-1], pontos: reply[i]})
			}
			res.send(lista)
		})
	})
});

app.get('/clear-db', (req, res) =>{
	client.del('players *', (err, reply) => {
		res.send(`Bando deletado: ${reply}`)
	})
})

app.listen(port, () => console.log(`Listening on port ${port}`));