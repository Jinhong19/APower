package pcc.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pcc.dao.CharacterRepository;
import pcc.dao.ItemRepository;
import pcc.dao.SpellRepository;
import pcc.model.Character;
import pcc.model.Item;
import pcc.model.Spell;

@RestController
@RequestMapping("/characters")
public class CharacterController {
    private CharacterRepository characterRepository;
    private SpellRepository spellRepository;
    private Logger logger = Logger.getLogger(CharacterController.class);
    private ItemRepository itemRepository;

    public CharacterController(CharacterRepository characterRepository, SpellRepository spellRepository, ItemRepository itemRepository) {
        this.characterRepository = characterRepository;
        this.spellRepository = spellRepository;
        this.itemRepository = itemRepository;
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

        Optional<Character> characterOp = this.characterRepository.findById(cid);

        if (characterOp.isPresent()) {
            Character character = characterOp.get();
            Optional<Spell> spellOp = this.spellRepository.findById(sid);
            if (spellOp.isPresent()) {
                Spell spell = spellOp.get();
                List<Spell> spells = character.getSpells();
                if (spells == null) spells = new ArrayList<>();
                spells.add(spell);
                character.setSpells(spells);
                logger.debug(character.toString());
                characterRepository.save(character);
                return ResponseEntity.ok("Spell Added");
            } else {
                return ResponseEntity.badRequest().body("Spell Not Found");
            }
        } else {
            return ResponseEntity.badRequest().body("Character Not Found");
        }
    }

    @PostMapping("/{characterId}/items/{itemId}")
    public ResponseEntity<String> addItem(@PathVariable("characterId") String cid,
            @PathVariable("itemId") String sid) {
        logger.info("Add Item " + sid + " to " + cid);

        Optional<Character> characterOp = this.characterRepository.findById(cid);

        if (characterOp.isPresent()) {
            Character character = characterOp.get();
            Optional<Item> itemOp = this.itemRepository.findById(sid);
            if (itemOp.isPresent()) {
                Item item = itemOp.get();
                List<Item> items = character.getItems();
                if (items == null) items = new ArrayList<>();
                items.add(item);
                character.setItems(items);
                logger.debug(character.toString());
                characterRepository.save(character);
                return ResponseEntity.ok("Item Added");
            } else {
                return ResponseEntity.badRequest().body("Item Not Found");
            }
        } else {
            return ResponseEntity.badRequest().body("Character Not Found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") String id) {
        logger.info("Delete " + id);

        this.characterRepository.deleteById(id);
        return ResponseEntity.ok("Character Deleted Successfully");
    }

}
