
const TotalVoice = require("totalvoice-node");

const request = require('request');
const https = require('https');

var dotenv = require('dotenv' );
dotenv.config({ silent: true });

const client = new TotalVoice(process.env.TOTALVOICE_API_KEY);

//simulando um DB
const servers = [
	{		 name: "SCARF Heroko",
				url: "https://scarf-app.herokuapp.com/",
			aviso: "sms",
	developer: {
						name: "Engenheiro H",
			 telephone: process.env.ENGENHEIRO_TELEFONE
			}
	},
	{	  name: "Gateway de APIs",
			 url: "http://localhost:3002",
		 aviso: "tts",
 developer: {
						name: "Engenheiro G",
			 telephone: process.env.ENGENHEIRO_TELEFONE
			}
	},
	{	 name: "Pipepper",
	   	url: "http://localhost:3001",
   	aviso: "sms",
		developer: {
						name: "Engenheiro P",
			 telephone: process.env.ENGENHEIRO_TELEFONE
			}
	}
];

const {
  setIntervalAsync,
  clearIntervalAsync 
} = require('set-interval-async/dynamic')
 
setIntervalAsync(
  () => avaliarDisponibilidade(),
  60 * 1000 // 1 min
)

function printLog(statusCode, msg){
	if (statusCode == 200)
		console.log('.[ok]. '+ statusCode + ' ' + msg);
	else
		console.log('[erro] '+ statusCode + ' ' + msg);
}

function logArrayElements(element, index, array) {

	var servico = element.name.padEnd(30, ' ') + "|";
	var url = element.url.padEnd(39, ' ') + "|";
	var dev = element.developer.name.padEnd(15, ' ') + "|";
	var devTelefone = (element.developer).telephone;
	var tipo = element.aviso;
	var message = `${element.developer.name} o ${element.name} está fora do ar, contamos com sua atuação.`;

	if (url.split(':')[0].toLowerCase() == 'https'){
		// HTTPS
		https.get( element.url , (resp) => {
			printLog( resp.statusCode , servico + url + dev );
		}).on("error", (err) => {
			printLog( 'NaN' , servico + url + dev );
			console.log(err);
			// TODO: Refatorar e criar uma funcao enviarSMS(element.developer.name, element.telephone, element.nome);

			// ## SMS
			if (tipo == "sms"){
				client.sms.enviar(devTelefone, message)
				.then((response) => {
					console.log(`-[/]-> O engenheiro ${element.developer.name} já foi avisado!`);
					console.log(response);
				})
				.catch(
					function (error) {
						console.error('Erro: ', error)
						throw error;
				})
			}
			
			// ## Ligação
			if (tipo == "tts"){
				const options = {
					velocidade: 2,
					tipo_voz: "br-Vitoria",
					resposta_usuario: true
				};

				client.tts.enviar(devTelefone, message, options).then(() => {
					console.log(`O engenheiro ${element.developer.name} já foi avisado!`);
				});
			}

		});
	}
	else{
		request( element.url, { json: true }, (err, res, body) => {
			if (err) { 
				printLog( 'NaN' , servico + url + dev );
				// TODO: Refatorar e criar uma funcao enviarSMS(element.developer.name, element.telephone, element.nome);

				// ## SMS
				if (tipo == "sms"){
					client.sms.enviar(devTelefone, message)
					.then((response) => {
						console.log(`-[/]-> O engenheiro ${element.developer.name} já foi avisado!`);
						console.log(response);
					})
					.catch(
						function (error) {
							console.error('Erro: ', error)
							throw error;
					})
				}

				// ## Ligação
				if (tipo == "tts"){
					const options = {
						velocidade: 2,
						tipo_voz: "br-Vitoria",
						resposta_usuario: true
					};

					client.tts.enviar(devTelefone, message, options).then(() => {
						console.log(`O engenheiro ${element.developer.name} já foi avisado!`);
					});
				}

				return console.log(err); 
			}
			printLog( res.statusCode , servico + url + dev );
		});
	}
	
}

async function avaliarDisponibilidade(){	
	console.log("\n-> Iniciando monitoramento dos servidores " + Date().toString());
	await servers.forEach(logArrayElements);
}