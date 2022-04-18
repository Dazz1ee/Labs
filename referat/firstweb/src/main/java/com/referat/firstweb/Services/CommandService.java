package com.referat.firstweb.Services;

import com.referat.firstweb.entities.Command;
import com.referat.firstweb.repositories.CommandsRepository;
import lombok.NoArgsConstructor;
import org.aspectj.apache.bcel.generic.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandService {
    private CommandsRepository commandsRepository;

    @Autowired
    public CommandService(CommandsRepository commandsRepository) {
        this.commandsRepository = commandsRepository;
    }

    public List<Command> search(String title){
        System.out.println("THIS: " + title);
        return commandsRepository.findAllByTitleContaining(title);
    }

    public List<Command> findAll(){
        return commandsRepository.findAll();
    }

    public void addCommand(Command command){
        commandsRepository.save(command);
    }

}
