FROM eclipse-temurin:21-jdk-alpine AS builder

USER root

WORKDIR /opt

ENV MAVEN_VERSION=3.9.7
ENV MAVEN_HOME=/usr/lib/mvn
ENV PATH=$MAVEN_HOME/bin:$PATH

RUN wget https://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz && \
    tar -zxvf apache-maven-$MAVEN_VERSION-bin.tar.gz && \
    rm apache-maven-$MAVEN_VERSION-bin.tar.gz && \
    mv apache-maven-$MAVEN_VERSION $MAVEN_HOME

WORKDIR /build

COPY pom.xml pom.xml
COPY src src

RUN mvn -B -ntp clean package -f pom.xml

FROM eclipse-temurin:21-jdk-alpine AS runtime

ARG APP_VERSION

WORKDIR /app

RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app

USER app

COPY --from=builder "/build/target/probujdenie-student-submission-$APP_VERSION.jar" app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]