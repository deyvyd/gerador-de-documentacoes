@echo off
echo Reconstruindo o CSS e reiniciando o container...
docker-compose exec app npm run build-css
docker-compose restart
echo Reconstrução concluída!