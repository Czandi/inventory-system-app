package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.Device;
import com.app.inventorysystemapp.model.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

  @Query("Select m from Model m")
  Page<Model> findAllModels(Pageable page);

  @Query("Select count(distinct d) from Device d inner join d.model m where m.id like ?1 group by d.model")
  int countModelById(long id);

//  @Query("")
//  Page<Model> findByContaining(String containing, Pageable page);
}
