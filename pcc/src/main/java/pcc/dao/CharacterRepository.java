package pcc.dao;

import pcc.model.Character;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends MongoRepository<Character, String> {
    List<Character> findByRulebookId(String id);

    List<Character> findByUserId(String id);
}
