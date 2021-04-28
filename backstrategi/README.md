# Backend Desafio Strategi

## Instruções para execução do backend

É possível inicializar o projeto de três formas diferentes, com makefile e docker, só docker, ou com virtual environment, abaixo será listado o passo a passo para a forma que te for mais conveniente.

- ### Makefile 

  Pré-requisitos:
    * [Make](https://stat545.com/make-windows.html)
    * [Docker](https://docs.docker.com/get-docker/)
    * [Docker Compose](https://docs.docker.com/compose/install/)

  Com o seu terminal aberto e dentro do diretório do projeto, insira os seguintes comandos:
  ```sh 
    $ make build
  ```
  ```sh 
    $ make start
  ```
  ```sh 
    $ make migrations
  ```
  ```sh 
    $ make migrate
  ```

- ### Docker

  Pré-requisitos:
    * [Docker](https://docs.docker.com/get-docker/)
    * [Docker Compose](https://docs.docker.com/compose/install/)

  Com o seu terminal aberto e dentro do diretório do projeto, insira os seguintes comandos:
  ```sh 
    $ docker-compose build
  ```
  ```sh 
    $ docker-compose up -d
  ```
  ```sh 
    $ docker-compose exec api python3 manage.py makemigrations
  ```
  ```sh 
    $ docker-compose exec api python3 manage.py migrate
  ```

- ### Virtual Environment

  Pré-requisitos:
    * [Python 3.9.4](https://www.python.org/downloads/)

    Com o seu terminal aberto e dentro do diretório do projeto, insira os seguintes comandos:
    ```sh 
      $ python3 -m venv venv
    ```
    ```sh 
      $ source venv/bin/activate
    ```
    ```sh 
      $ pip3 install -r requirements.txt
    ```
    ```sh 
      $ python3 manage.py runserver
    ```
    ```sh 
      $ python3 manage.py makemigrations
    ```
    ```sh 
      $ python3 manage.py migrate
    ```

## Instruções para criar um super usuário de acesso ao banco

Assim como para inicialização, é possível utilizar os mesmos recursos para criar um super usuário
- ### Makefile 

  ```sh 
    $ make superuser
  ```

- ### Docker

  ```sh 
    $ docker-compose exec api python3 createsuperuser
  ```

- ### Virtual Environment

  ```sh 
      $ python3 manage.py createsuperuser
    ```

Com o super usuário criado, acesse a dashboard de administração do Django, o [Django Admin](http://localhost:8000/admin) através da url [http://localhost:8000/admin](http://localhost:8000/admin)