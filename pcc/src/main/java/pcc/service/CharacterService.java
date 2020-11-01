package pcc.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import pcc.dao.CharacterRepository;
import pcc.dao.ItemRepository;
import pcc.dao.SpellRepository;
import pcc.model.Character;
import pcc.model.Item;
import pcc.model.Spell;

@Service
public class CharacterService {
    private CharacterRepository characterRepository;
    private ItemRepository itemRepository;
    private SpellRepository spellRepository;

    public CharacterService(CharacterRepository characterRepository, ItemRepository itemRepository,
            SpellRepository spellRepository) {
        this.characterRepository = characterRepository;
        this.itemRepository = itemRepository;
        this.spellRepository = spellRepository;
    }

    public ResponseEntity<String> addSpell(String cid, String sid) {
        Optional<Character> characterOp = this.characterRepository.findById(cid);
        if (characterOp.isPresent()) {
            Character character = characterOp.get();
            Optional<Spell> spellOp = this.spellRepository.findById(sid);
            if (spellOp.isPresent()) {
                Spell spell = spellOp.get();
                List<Spell> spells = character.getSpells();
                if (spells == null)
                    spells = new ArrayList<>();
                spells.add(spell);
                character.setSpells(spells);
                characterRepository.save(character);
                return ResponseEntity.ok("Spell Added for " + cid);
            } else {
                return ResponseEntity.badRequest().body("Spell Not Found");
            }
        } else {
            return ResponseEntity.badRequest().body("Character Not Found");
        }
    }

    public ResponseEntity<String> addItem(String cid, String iid) {
        Optional<Character> characterOp = this.characterRepository.findById(cid);
        if (characterOp.isPresent()) {
            Character character = characterOp.get();
            Optional<Item> itemOp = this.itemRepository.findById(iid);
            if (itemOp.isPresent()) {
                Item item = itemOp.get();
                List<Item> items = character.getItems();
                if (items == null)
                    items = new ArrayList<>();
                items.add(item);
                character.setItems(items);
                characterRepository.save(character);
                return ResponseEntity.ok("Item Added for " + cid);
            } else {
                return ResponseEntity.badRequest().body("Item Not Found");
            }
        } else {
            return ResponseEntity.badRequest().body("Character Not Found");
        }
    }
}
