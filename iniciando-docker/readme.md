## Docker from zero to hero :)

```docker run nginx:1.19.10-alpine```

### binding de porta
Cria o acesso da máquina host para o servidor do docker

```docker run -p 8000:80  nginx:1.19.10-alpine```


#### entrando no container para criar/editar arquivos

```docker exec -it <container_id | container_name> sh```

- a navegação dentro do container é a básica de linux (ls / pwd)

``` cd /usr/share/nginx/html ```

- a edição básica é feita com o que existe dentro do container

``` vi index.html```


### volumes
Permite que a edição de arquivos e projetos na nossa máquina seja sincronizada com o container

- Rodando o container em modo detached
```docker run -p 8000:80 -d nginx:1.19.10-alpine```

- Parando o container detached
``` docker stop <container_id | container_name>```

- Setando o volume local dentro do container
```docker run -v $(pwd):/usr/share/nginx/html-p 8000:80 -d nginx:1.19.10-alpine```
A partir daqui todo arquivo colocado no PWD será pareado dentro do container.
Se criarmos um index.html, ele será o mesmo do container e qualquer mudança feita em qualquer uma das pontas refletirá na outra

### container
É um agente baseado na imagem. O container é mutável, mas a imagem é Imutável.

#### Dockerfile
É onde vamos descrever como a imagem será criada.

- Gerando uma nova imagem customizada:
    - Cria-se um Dockerfile que copia o que for necessário para dentro da imagem
    - ```COPY index.html /usr/share/nginx/html```
    - ```docker build -t custom-nginx .```
    - Com a imagem em questão é possível rodar a imagem criad
    - ```docker ls```
    - ```docker run -d -p 8000:80 custom-nginx```

- Como alterar a imagem?
    - ```docker stop <imageName>```
    - altere os arquivos
    - ```docker build -t custom-nginx .```
    - ```docker run -d -p 8000:80 custom-nginx ```


Continuar aqui: https://www.youtube.com/live/BICy_5hXWWs?feature=share&t=6123