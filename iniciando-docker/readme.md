## Docker from zero to hero :)

```docker run nginx:1.19.10-alpine```

## binding de porta
cria o acesso da máquina host para o servidor do docker

```docker run -p 8000:80  nginx:1.19.10-alpine```


### entrando no container para criar/editar arquivos

```docker exec -it <container_id | container_name> sh```

- a navegação dentro do container é a básica de linux (ls / pwd)

``` cd /usr/share/nginx/html ```

- a edição básica é feita com o que existe dentro do container

``` vi index.html```


## volumes