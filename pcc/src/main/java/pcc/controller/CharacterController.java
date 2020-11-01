package pcc.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pcc.dao.CharacterRepository;
import pcc.model.Character;

@RestController
@RequestMapping("/characters")
@ResponseBody
public class CharacterController {
    private CharacterRepository characterRepository;
    private Logger logger = Logger.getLogger(CharacterController.class);

    public CharacterController(CharacterRepository characterRepository) {
        this.characterRepository = characterRepository;
    }

    @GetMapping()
    public List<Character> getAll() {
        logger.info("Get All");

        return characterRepository.findAll();
    }

    @GetMapping("/rulebooks/{rulebookId}")
    public List<Character> getByRulebook(@PathVariable("rulebookId") String id) {
        logger.info("Get By RuleBook");

        return characterRepository.findByRulebookId(id);
    }

    @GetMapping("/users/{userId}")
    public List<Character> getByUser(@PathVariable("userId") String id) {
        logger.info("Get By User");

        return characterRepository.findByUserId(id);
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Character character) {
        logger.info("Add " + character.toString());

        this.characterRepository.insert(character);
        return ResponseEntity.ok("Character Created Successfully");
    }

}
