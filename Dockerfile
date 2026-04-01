FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

RUN apk add --no-cache docker-cli \
    && which docker \
    && docker --version

COPY target/*.jar app.jar
COPY src/main/resources/student-submission-template submission-template

ENTRYPOINT ["java", "-jar", "app.jar"]
# докер ран чтобы контейнер был максимально защищен от уязвимостей из кода который внутри а также как собрать образ