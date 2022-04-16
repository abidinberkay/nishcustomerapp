FROM maven:3.8.4-eclipse-temurin-17 AS build
COPY ./src /usr/app/src
COPY ./pom.xml /usr/app
RUN cd /usr/app && mvn clean package

FROM openjdk:11.0.14
ADD ./target/nishcustomer-0.0.1-SNAPSHOT.jar nishcustomer.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","nishcustomer.jar"]
