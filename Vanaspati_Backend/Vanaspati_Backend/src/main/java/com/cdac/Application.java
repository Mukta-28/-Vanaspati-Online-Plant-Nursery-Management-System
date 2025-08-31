package com.cdac;

import org.modelmapper.Condition;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	 ModelMapper modelMapper() {
		System.out.println("creating model mapper");
		 ModelMapper mapper=new ModelMapper();

		 mapper.getConfiguration()
		 .setMatchingStrategy(MatchingStrategies.STRICT)
				 .setPropertyCondition(Conditions.isNotNull());

		 return mapper;
		 
	}

}
