# Webseite Weissenberge

Website Weissenberge on [weissenberge.linoo.ch](https://weissenberge.linoo.ch) is the website which shows the pictures from my own webcam from the vacation house and the current temperature data.

## 🚀 Deployment

### 🐙 Github Action
With the [Dockerfile](Dockerfile) and the [Github Action](.github/workflows/publish-ghcr.yaml), an image is automatically created, which is then uploaded to the GitHub Container Registry

### 🐳 Docker Compose
The Website Weissenberge with one container is deployed on the Docker Ubuntu Server from Lino.

The following Docker Compose is used in Portainer on the Docker Ubuntu Server from Lino, where the image can be re-pulled manuell to update the website.

```docker
version: '3'
services:
  web:
    image: ghcr.io/surmatik/webseite-weissenberge:latest
    ports:
      - "3002:3000"
    environment:
      NODE_ENV: ${NODE_ENV}
      DB_USER: ${DB_USER}
      DB_HOST: ${DB_HOST}
      DB_NAME: ${DB_NAME}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_PORT: ${DB_PORT}

```

Environment variables:
- NODE_ENV: production
- DB_USER
- DB_HOST
- DB_NAME
- DB_PASSWORD
- DB_PORT

## 🚀 Local Deployment

Requirements

- Node.js: `sudo apt install nodejs`
- Express.js: `npm install express`
- Dotenv: npm `install dotenv`

1. Clone the [Webseite-Weissenberge](https://github.com/surmatik/Webseite-Weissenberge.git) Repoistory from Github.
    ```bash
    git clone https://github.com/surmatik/Webseite-Weissenberge.git
    ```

2. Start Node.js Server
    ```bash
    node app.js
    ```