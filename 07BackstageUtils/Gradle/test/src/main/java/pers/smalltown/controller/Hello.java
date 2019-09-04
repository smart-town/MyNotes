package pers.smalltown.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Hello
 */
@Controller
public class Hello {
    @RequestMapping("/")
    public @ResponseBody String index(){
        System.out.println("Index");
        return "ok";
    }
}