<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

### Rodando o Docker container
```
  chmod +x .docker/start.sh
  docker compse up --build
```
Terminado o build, saia do processo com CTRL+C
```
  docker compose up -d
  docker compose exec app bash
  npm run start:dev
```
Para sair do nest: $ exit
Para sair do docker compose: $ docker compose stop
