package pcc.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pcc.dao.SpellRepository;
import pcc.model.Spell;

@RestController
@RequestMapping("/spells")
@ResponseBody
public class SpellController {
    private SpellRepository spellRepository;
    private Logger logger = Logger.getLogger(SpellController.class);

    public SpellController(SpellRepository spellRepository) {
        this.spellRepository = spellRepository;
    }

    @GetMapping()
    public List<Spell> getAll() {
        logger.info("Get All");

        return spellRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Spell spell) {
        logger.info("Add " + spell.toString());

        this.spellRepository.insert(spell);
        return ResponseEntity.ok("Spell Created Successfully");
    }

}
