package pcc.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pcc.dao.CharacterRepository;
import pcc.model.Character;
import pcc.service.CharacterService;

@RestController
@RequestMapping("/characters")
public class CharacterController {
    private CharacterRepository characterRepository;
    private CharacterService characterService;
    private Logger logger = Logger.getLogger(CharacterController.class);

    public CharacterController(CharacterRepository characterRepository, CharacterService characterService) {
        this.characterRepository = characterRepository;
        this.characterService = characterService;
    }

    @GetMapping("{id}")
    public Character getById(@PathVariable("id") String id) {
        logger.info("Get " + id);

        return characterRepository.findById(id).orElse(null);
    }

    @GetMapping
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

    @PostMapping("/{characterId}/spells/{spellId}")
    public ResponseEntity<String> addSpell(@PathVariable("characterId") String cid,
            @PathVariable("spellId") String sid) {
        logger.info("Add Spell " + sid + " to " + cid);

        return characterService.addSpell(cid, sid);

    }

    @PostMapping("/{characterId}/items/{itemId}")
    public ResponseEntity<String> addItem(@PathVariable("characterId") String cid, @PathVariable("itemId") String iid) {
        logger.info("Add Item " + iid + " to " + cid);

        return characterService.addItem(cid, iid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") String id) {
        logger.info("Delete " + id);

        this.characterRepository.deleteById(id);
        return ResponseEntity.ok("Character Deleted Successfully");
    }

}
