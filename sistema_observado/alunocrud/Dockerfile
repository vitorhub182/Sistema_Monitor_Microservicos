# Definição de build para a imagem do Spring boot
FROM openjdk:17-alpine as build

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x ./mvnw
# Faça o download das dependencias do pom.xml
RUN ./mvnw dependency:go-offline -B



COPY src src

RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# Definição de produção para a imagem do Spring boot
FROM openjdk:17-alpine as production
ARG DEPENDENCY=/app/target/dependency

# Copiar as dependencias para o build artifact
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
# Copiar o agente OpenTelemetry para o container
COPY ./opentelemetry-javaagent.jar /opentelemetry-javaagent.jar
COPY ./opentelemetry-javaagent-extension.jar /opentelemetry-javaagent-extension.jar
COPY ./config_agent.properties /config_agent.properties

# Rodar a aplicação Spring boot
ENTRYPOINT ["java", "-javaagent:/opentelemetry-javaagent.jar", "-Dotel.javaagent.extensions=/opentelemetry-javaagent-extension.jar", "-cp", "app:app/lib/*","com.crudspringjvsd.alunocrud.AlunocrudApplication"]