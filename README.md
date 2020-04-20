#




<b><b1>Monitoração Ativa de Apps HTTP</b1></b><br>

1. Clone esse repositório com o comando: <code>git clone https://github.com/wcristoni/monit-call.git</code><br>

2. Digite o comando <code>npm install</code>, esse procedimento baixará todas as dependências do projeto

3. Vá ao site https://zenapi.zenvia.com/produtos/voz/  e crie uma conta.<br>

4. Até que você confirme todos os dados sua conta será do tipo TRIAL.<br>

5. Copie a sua chave de acesso (API KEY)<br>

6. Crie um arquivo chamado .env e nele informe as seguintes chaves<br>
<code>ENGENHEIRO_TELEFONE=''</code>  -> Informe o mesmo telefone que você cadastrou no passo 3<br>
<code>GESTOR_TELEFONE=''</code> -> Informe o mesmo telefone que você cadastrou no passo 3<br>
<code>TOTALVOICE_API_KEY=''</code> -> Aqui cole a chave que você copiou no passo 5<br>
 
 7. Abra 3 terminais<br>

 8. No primeiro terminal vá até a pasta <code>./app-pipepper</code> e execute os comandos <code>npm install && npm start</code>, este passo subirá um serviço chamado "app-pipepper" acesssível em http://localhost:3001<br>

9. No primeiro terminal vá até a pasta <code>./app-gateway-api</code> e execute os comandos <code>npm install && npm start</code>, este passo subirá um serviço chamado "app-gateway-api" acesssível em http://localhost:3002<br>

10. No terceiro terminal fique na pasta principal do <code>monit-call</code> e execute o comando <code>npm start</code><br>

11. Se todos os passos foram realizados corretamente, os 3 serviços devem estar em execução e no terceiro teminal a cada minuto deve estar sendo exibido um log, onde mostra sucesso no testes dos 2 primeiros processos.<br>

12. Agora escolha um dos processos e pare a execução dele, você receberá um SMS ou uma ligação avisando que o serviço está parado.<br>