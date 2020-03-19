# Formare Chat - Desafio

- Aplicação de chat em MERN Javascript stack

- Requisitos atendidos:

  - login de usuários
  - identificação de usuários
  - envios de mensagens
  - data e hora em mensagens
  - organização de mensagens e auto roll
  - login de admin com auth
  - filtros de mensagem por username, data(2020-08-18) e order(-1)
  - delete das mensagens

- Rotas:

  - / (GET) - Acesso a pagina inicial
  - /chat?username=?&room=? (GET) - Acesso a até 4 salas de batepapo (cada mensagem é armazenada no banco!)
  - /admin/users (GET / POST) - Criação e listagem de admin (apenas backend)
  - /admin/sessions (POST) - Criação de sessao e autenticação (apenas backend)
  - /admin/chat - (GET/DELETE) - Acesso as mensagens do chat (backend e frontend)
    - A rota de /admin/chat necessita de autenticação
    - A rota de /admin/chat permite o GET, apenas no backend, com filtros
      - filtros: por username, data(2020-08-18) e order(-1)

- Como iniciar: yarn || npm install

  - No backend:
    - Run: yarn dev || npm dev
  - No frontend:
    - Run: yarn start || npm start

# Docker

- Utilizado para MongoDb
  - Run: docker run --name mongobarber -p 27017:27017 -d -t mongo
  - Mongo db Compass community - Usado para validar documentos
