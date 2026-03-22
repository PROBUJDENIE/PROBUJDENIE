FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

COPY target/*.jar app.jar
COPY src/main/resources/student-submission-template submission-template

RUN mkdir -p student_submissions
ENTRYPOINT ["java", "-jar", "app.jar"]

