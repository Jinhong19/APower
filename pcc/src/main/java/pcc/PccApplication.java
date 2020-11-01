package pcc;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class PccApplication {

	private static Logger logger = Logger.getLogger(PccApplication.class);

	public static void main(String[] args) {
		logger.info("STARTING THE APPLICATION");
		SpringApplication.run(PccApplication.class, args);
	}

}
