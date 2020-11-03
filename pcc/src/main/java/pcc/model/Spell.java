package pcc.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="spells")
public class Spell {
    @Id
    private String id;
    private String rulebookId;
    private String name;
    private String description;
    private String effect;
    private double price;
    private String author;
}
