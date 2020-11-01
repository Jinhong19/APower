package pcc.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pcc.dao.ItemRepository;
import pcc.model.Item;

@RestController
@RequestMapping("/items")
@ResponseBody
public class ItemController {
    private ItemRepository itemRepository;
    private Logger logger = Logger.getLogger(ItemController.class);

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping
    public List<Item> getAll() {
        logger.info("Get All");

        return itemRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Item item) {
        logger.info("Add " + item.toString());

        this.itemRepository.insert(item);
        return ResponseEntity.ok("Item Created Successfully");
    }

}
