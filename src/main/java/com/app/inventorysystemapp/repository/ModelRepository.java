package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

  @Query("Select m from Model m")
  Page<Model> findAllModels(Pageable page);

//  @Query("")
//  Page<Model> findByContaining(String containing, Pageable page);
}
