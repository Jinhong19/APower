package pcc.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "characters")
public class Character {
    @Id
    private String id;
    private String userId;
    private String rulebookId;
    private String name;
    private int age;
    private Gender gender;
    private String homeland;
    private String backgroundStory;
    private List<Stat> stats;
    private List<Skill> skills;
    private List<Item> items;
    private List<Spell> spells;
}
