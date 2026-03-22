package org.hse.probujdenie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ProbujdenieApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProbujdenieApplication.class, args);
    }

}
