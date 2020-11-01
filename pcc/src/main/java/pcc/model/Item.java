package pcc.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "items")
public class Item {
    @Id
    private String id;
    private String rulebookId;
    private String name;
    private String description;
    private String effect;
    private double price;
    private double weight;
    private String author;
}
