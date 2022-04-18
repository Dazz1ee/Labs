package com.referat.firstweb.controllers;

import com.referat.firstweb.Services.CommandService;
import com.referat.firstweb.entities.Command;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class CommandController {
    @Autowired
    CommandService commandService;

    @PostMapping("/add")
    public String addCommand(@RequestBody Command command){
        commandService.addCommand(command);
        return "Command added";
    }

    @GetMapping
    public List<Command> homePage(@RequestParam(value = "title", required = false) String title){
        System.out.println(title);
        if(title != null){
            List <Command> command = commandService.search(title);
            if(!command.isEmpty()){
                System.out.println(command);
                return command;
            }
            try {
                Document document = Jsoup.connect("https://help.ubuntu.ru/wiki/%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0").get();
                Elements elements = document.select("tr");
                for(Element element : elements){
                    //System.out.println(element.text());
                    if(element.select("td.col0").text().contains(title)){
                        Command command1 = new Command();
                        command1.setTitle(element.select("td.col0").text());
                        command1.setInfo(element.select("td.col1").text());
                        commandService.addCommand(command1);
                        System.out.println("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
                    }
                }
                return commandService.search(title);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
    @GetMapping("/all")
    public List<Command> findAll(){
        return commandService.findAll();
    }
}
