package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.interfaces.IModel;
import com.app.inventorysystemapp.model.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

  @Query("Select " +
    "m.name as modelName, " +
    "m.id as modelId, " +
    "m.type.name as typeName, " +
    "count(m.name) as modelCount " +
    "from Device d " +
    "inner join d.model m " +
    "group by m.id")
  Page<IModel> findAllModelsWithCount(Pageable page);

  @Query("Select " +
    "m.name as modelName, " +
    "m.id as modelId, " +
    "m.type.name as typeName, " +
    "count(d.model.name) as modelCount " +
    "from Device d " +
    "inner join d.model m " +
    "group by m.id " +
    "having m.name like concat('%', ?1, '%') " +
    "or m.type.name like concat('%', ?1, '%') " +
    "or count(d.model.name) = ?1" +
    "")
  Page<IModel> findAllModelsWithCountByContaining(String search, Pageable paging);
}
