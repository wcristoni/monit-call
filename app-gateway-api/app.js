const http = require("http");
var dotenv = require('dotenv' );

dotenv.config({ silent: true });
console.log(`o app ${process.env.APP_NAME} foi iniciado na porta ${process.env.APP_PORT}`);

http.createServer((req, res) => {
	res.write(`{'app':'${process.env.APP_NAME}'}`);
	res.end();
}).listen(process.env.APP_PORT);
