package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.ProductType;
import com.app.inventorysystemapp.model.interfaces.IModel;
import com.app.inventorysystemapp.model.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

  @Query("Select " +
    "m.name as modelName, " +
    "m.id as modelId, " +
    "m.type.name as typeName, " +
    "count(m.name) as modelCount " +
    "from Product d " +
    "inner join d.model m " +
    "group by m.id")
  Page<IModel> findAllModelsWithCount(Pageable page);

  @Query("Select " +
    "m.name as modelName, " +
    "m.id as modelId, " +
    "m.type.name as typeName, " +
    "count(m.name) as modelCount " +
    "from Product d " +
    "inner join d.model m " +
    "group by m.id " +
    "having m.id like ?1")
  IModel findByIdWithCount(long id);

  @Query("Select " +
    "m.name as modelName, " +
    "m.id as modelId, " +
    "m.type.name as typeName, " +
    "count(d.model.name) as modelCount " +
    "from Product d " +
    "inner join d.model m " +
    "group by m.id " +
    "having m.name like concat('%', ?1, '%') " +
    "or m.type.name like concat('%', ?1, '%') " +
    "or count(d.model.name) = ?1" +
    "")
  Page<IModel> findAllModelsWithCountByContaining(String search, Pageable paging);

    Model findByName(String name);

    List<Model> findByType(ProductType productType);
}
