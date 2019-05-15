//package main.java;
package pers.smalltown;


import org.springframework.boot.SpringApplication;



import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry
 */
@SpringBootApplication
public class Entry {
    public static void main(String[] args) {
        System.out.println("Entry...");
        SpringApplication.run(Entry.class,args);
    }
}