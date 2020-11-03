package pcc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pcc.dao.ItemRepository;
import pcc.dao.SpellRepository;
import pcc.model.Market;

@RestController
@RequestMapping("/market")
public class MarketController {
    private ItemRepository itemRepository;
    private SpellRepository spellRepository;

    public MarketController(ItemRepository itemRepository, SpellRepository spellRepository) {
        this.itemRepository = itemRepository;
        this.spellRepository = spellRepository;
    }

    @GetMapping
    public Market getMarket() {
        Market market = new Market();
        market.setItems(itemRepository.findAll());
        market.setSpells(spellRepository.findAll());
        return market;
    }
}
