# **IMPORTANT NOTE BEFORE STARTING:**
I am using apple M1 chip ps, and sometimes container images are making problem and that took my time alot. If you are not using M1 chip apple then comment out or delete the line "platform: linux/amd64" of mysql service in docker-compose.yml file.

# 1.RUNNING PROJECT FROM DOCKER

1.1- Edit application.properties file on backend https://github.com/abidinberkay/nishcustomerapp/blob/main/nishcustomer/src/main/resources/application.properties
Comment out the specified local db properties and use docker properties as instructed on the file.

1.2- Go to main directory (where the docker-compose.yml file is located)
run the command on terminal:
docker-compose up -d

(Backend service will be ready in 1 minutes and may be restarted couple of times for waiting db containers to be ready)

# 2.RUNNING PROJECT FROM LOCAL

2.1.1- If you do not use docker-compose.yml file, just run following 2 commands to run db containers:

(for the following command remove latest-aarch64 tag from the command If you are not using Apple M1 chip, I hate this config problem but I do not have an intel chip pc so sorry)

docker run -p 3306:3306 -v /tmp:/tmp --name mysqlcustomerdb --detach -e MYSQL_ROOT_PASSWORD="1234" -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=mysqlcustomerdb -d mysql/mysql-server:latest-aarch64 --lower_case_table_names=1 --init-connect='GRANT CREATE USER ON . TO 'root'@'%';FLUSH PRIVILEGES;'

docker run --name postgresfiledb -e POSTGRES_USER=root -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres

2.1.2- Or run docker-compose.yml file by commenting out the frontend and nishcustomer services.

2.2- Go to main directory of backend project (where the pom.xml lies) run following two commands and then run project from your IDE:
mvn clean
mvn install

2.3- Go to main directory of frontend project (where the package.json lies) run following two commands
npm install (or yarn install)
npm start (or yarn start)

You can see the page on http://localhost:3000


notes:
- Everything is mostly done on backend except JWT.

- Front-end is not completed, File page and operations (add, update) are not working from front-end. Postman request to backend (add file, update file) are working via Postman but not working from front-end. This issue got %95 of my time, I am about the break the pc, I decided to even not to start JWT thingy without that but time is up. If you can find why I can't send file from front-end and inform me (even if you do not want to proceed interviews with me) I would be very happy, pretty sure some 'header' or 'axios properties' are wrong but could not find yet.
