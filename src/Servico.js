import {Component} from "react";
import axios from 'axios';


export default class Servico extends Component{

	getJogador = () => {
		return axios.post("/set/", {
			daniel: 21
		}).then(response => {
			console.log(response.data)
			return response.data
		}).catch(
			() => console.log("erro")
		)
	};

	adicionarPontos = (nome, pontos) => {
		console.log("adicionar")
		return axios.post("/zadd/", {
			nome:nome,
			pontos:pontos
		}).then(response => {
			console.log(response.data)
			return response.data
		}).catch(
			() => console.log("erro")
		)
	};

	incrementar = (nome, pontos) => {
		console.log("incrementar")
		return axios.post("/zincre/", {
			nome:nome,
			pontos:pontos
		}).then(response => {
			console.log(response.data)
			return response.data
		}).catch(
			() => console.log("erro")
		)
	};

	getRanking = () => {
		console.log("Top 10")
		return axios.post("/listagem/", {rank: -10}).then(response => {
			console.log(response.data)
			return response.data
		}).catch(
			() => console.log("erro")
		)
	};

	listagem = () => {
		console.log("Todos")
		return axios.post("/listagem/", {rank:0}).then(response => {
			console.log(response.data)
			return response.data
		}).catch(
			() => console.log("erro")
		)
	};

	getByPosition = (posicao) => {
		console.log("Posição " + posicao)
		return axios.post("/posicao/", {posicao: posicao}).then(response => {
			console.log(response.data)
			return response.data
		}).catch(
			() => console.log("erro")
		)
	};
	
}
