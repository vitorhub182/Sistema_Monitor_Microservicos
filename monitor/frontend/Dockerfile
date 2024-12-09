FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do projeto
COPY . .

# Expor a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar o modo de desenvolvimento
ENTRYPOINT ["npm", "run", "dev"]
