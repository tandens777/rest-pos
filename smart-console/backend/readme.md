mvn spring-boot:run
mvn clean spring-boot:run


#To add swagger
- add SwaggerConfig.java  (juz copy)
- add in pom.xml
		<dependency>
			<groupId>org.springdoc</groupId>
			<artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
			<version>2.3.0</version>
		</dependency>		

- add in application.properties for debug
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.springdoc=DEBUG
- to test http://localhost:8080/swagger-ui/index.html or http://localhost:8080/apidoc


- use postman to login
http://localhost:8080/auth/login
put Header Content-Type: application/json
body
{
  "pinCode": "080888"
}

copy token to Bearer in Header Authorization:  Bearer <token>

# to run update or create
put value in body and also put token in Header, Authorization: Bearer <token>
name:  DEN

