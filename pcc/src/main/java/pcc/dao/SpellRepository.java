package pcc.dao;

import pcc.model.Spell;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpellRepository extends MongoRepository<Spell, String> {

}