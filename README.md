# Bravo Mock
## Pré-requisitos

➜  ~ node —version

**v8.12.0**

➜  ~ npm —version

**6.4.1**

**MongoDB**

Você pode instalar diretamente na sua máquina local [www.mongodb.com/download-center](https://www.mongodb.com/download-center/v2/community), mas eu sugiro que você utilize o [docker](https://www.docker.com/). Se você já tem o docker instalado, basta executar o comando abaixo.

``` bash
docker run -d --name mongo -p 27017:27017 mongo:latest
```


## Configuração

Para iniciar, modo de desenvolvedor, basta executar o comando abaixo

``` bash
npm run dev
```

Agora você tem um servidor rodando em **http://0.0.0.0:9000** que pode ser utilizado para criar os seus mocks!

A nossa API é simples, mas mesmo aplicações simples devem nascer robustas e seguras. Por isso, vamos criar o nosso usuário e nos autenticar para utilizar as capacidades desta API.

### Criar usuário

Podemos usar o POSTMAN, mas prefiro seguir o exemplo com linha de comando. Particularmente, gosto muito do [HTTPie](https://httpie.org/).

``` bash
http POST http://0.0.0.0:9000/users \
email=<USUARIO> \
password=<SENHA> \
access_token=<MASTER_KEY>
```

O retorno será algo parecido com isso:

``` bash
HTTP/1.1 201 Created
{
    "createdAt": "2018-10-06T12:09:29.101Z",
    "email": "erick@cellani.com.br",
    "id": "5bb4c3AAe0b0de664c48eAA5aAw14bbc0",
    "name": "erick",
    "picture": "https://gravatar.com/avatar/fe9b877639bfa4177613ee7daf73a4c8?d=identicon"
}
```

### Autenticar

``` bash
http -a <EMAIL>:<SENHA> \
POST http://0.0.0.0:9000/auth \
access_token=<MASTER_KEY>
```

O retorno será algo parecido com isso:

``` bash
HTTP/1.1 201 Created
{
    "token": "eyJhbGciOiJIUzI1BVisPS4cRDRIkpFIFA19",
    "user": {
        "createdAt": "2018-10-06T12:09:29.101Z",
        "email": "erick@cellani.com.br",
        "id": "5bb4c3AAe0b0de664c48eAA5aAw14bbc0",
        "name": "erick",
        "picture": "https://gravatar.com/avatar/fe9b877639bfa4177613ee7daf73a4c8?d=identicon"
    }
}
```

Agora você pode usar o token `eyJhbGciOiJIUzI1BVisPS4cRDRIkpFIFA19` para chamar as APIs protegidas.

## Let's play!

O uso é muito simples. Vamos criar um novo mock:
``` bash
http POST http://0.0.0.0:9000/mocks <<< ' {"access_token":"eyJhbGciOiJIUzI1BVisPS4cRDRIkpFIFA19", "body": {"teste":"teste"} }'
```

O retorno desta chamada será assim:

``` bash
HTTP/1.1 201 Created
{
    "body": {
        "teste": "teste"
    },
    "createdAt": "2018-10-06T17:42:27.344Z",
    "createdBy": {
        "createdAt": "2018-10-06T12:09:29.101Z",
        "email": "erick@cellani.com.br",
        "id": "5bb4c3AAe0b0de664c48eAA5aAw14bbc0",
        "name": "erick",
        "picture": "https://gravatar.com/avatar/fe9b877639bfa4177613ee7daf73a4c8?d=identicon"
    },
    "id": "5bb8f403733cb3aa5810586a",
    "updatedAt": "2018-10-06T17:42:27.344Z"
}
```

Pronto, você já pode utilizar o mock na sua aplicação, basta substituir a chamada original, por esta:

``` bash
http GET http://0.0.0.0:9000/mocks/5bb8f403733cb3aa5810586a
```

Segue o retorno:

``` bash
HTTP/1.1 200 OK
{
    "teste": "teste"
}
```
