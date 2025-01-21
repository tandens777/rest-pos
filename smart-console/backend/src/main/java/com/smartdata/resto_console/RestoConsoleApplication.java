package com.smartdata.resto_console;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class RestoConsoleApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestoConsoleApplication.class, args);
	}

}
