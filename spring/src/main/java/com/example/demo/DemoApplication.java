package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

	// private final AtomicLong counter = new AtomicLong();
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}

	@GetMapping("/")
	public String index() {
		return "Hanyuu's spring.";
	}

	@GetMapping("/greeting")
	public User greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		// return new Greeting(counter.incrementAndGet(),String.format("Hi, %s",name));
		return new User(1, String.format("Hi, %s", name));
	}
}
