# Use uma imagem Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie apenas os arquivos essenciais para o container
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do projeto para o diretório de trabalho
COPY . .

# Compile o projeto TypeScript para JavaScript
RUN npm run build

# Exponha a porta onde o Nest.js irá rodar
EXPOSE 3000

# Comando para iniciar o servidor
ENTRYPOINT ["npm", "run", "start:prod"]
