## Sample Movies List Project

This was created for only learning.

#### Before running

Docker is now host over https. But the ssl certificate has to be installed on your browser for
detecting this as a secure connection.

Step 1. Get ssl certificate from this [download link](https://raw.githubusercontent.com/harikrishnan-annappilly/movies/feature/ssl/backend/ssl/cert.crt)

Step 2. Install this certificate in web browser from Settings -> Manage SSL

Dont forget to choose option `Trusted root authorities` while installing the SSL certificate

#### Prerequisites

To run this project you should have `docker` installed in your system.

### How to run the project

#### Run the below commands

1. Pull the image from docker hub.

```
 docker compose pull
```

-   If pull failed then run below command to build it your self.

```
docker compose build
```

2. Run the project using below command.

```
docker compose up -d
```

-   Then go to any of the below links as you like,

    -   frontend link: http://localhost

    -   backend link: http://localhost:5000

3. Remove the containers using below command.

```
docker compose down
```
