package pcc.model;

import java.util.List;

import lombok.Data;

@Data
public class Market {
	private List<Item> items;
    private List<Spell> spells;
}
