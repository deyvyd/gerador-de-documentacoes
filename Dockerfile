# Use uma imagem oficial do Python como base
FROM python:3.11-slim-bullseye

# Define o diretório de trabalho no contêiner
WORKDIR /app
RUN apt update

RUN apt-get install -y tzdata \
  && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
  && echo "America/Sao_Paulo" > /etc/timezone

RUN apt install -y gcc libreoffice

# Instalar Node.js na versão LTS
RUN apt-get update && apt-get install -y curl gnupg
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs \
    && node --version \
    && npm --version

# Limpar cache do apt para reduzir o tamanho da imagem
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Copia os arquivos de requisitos primeiro para aproveitar o cache do Docker
COPY requirements.txt ./requirements.txt

# Instala as dependências Python
RUN pip3 install --no-cache-dir -r requirements.txt

# Copia package.json e package-lock.json antes para melhor uso do cache
COPY package.json package-lock.json ./

# Instala dependências Node sem executar scripts
RUN npm install --ignore-scripts

# Copia o restante do código da aplicação
COPY . .

# Gera o CSS do tailwind manualmente
RUN npx tailwindcss -i ./src/input.css -o ./static/css/tailwind.css --minify

# Compila o frontend usando vite diretamente
RUN node ./node_modules/vite/bin/vite.js build

# Expõe a porta em que a aplicação vai rodar
EXPOSE 5000

# Define a variável de ambiente para produção
ENV FLASK_ENV=production

# Comando para iniciar a aplicação
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
