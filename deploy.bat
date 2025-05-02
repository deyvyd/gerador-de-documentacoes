@echo off
echo Construindo o aplicativo para producao...
call npm run build

echo Verificando se o Docker esta instalado...
where docker >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Docker nao esta instalado. Por favor, instale o Docker para continuar.
    exit /b 1
)

echo Construindo e iniciando o conteiner Docker...
docker-compose up --build -d

echo Aplicacao implantada com sucesso! Acesse http://localhost:5000