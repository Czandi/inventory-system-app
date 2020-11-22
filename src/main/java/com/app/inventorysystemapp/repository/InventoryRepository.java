package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

  @Query("Select i from Inventory i " +
    "where i.room.name like %?1% " +
    "or i.date like %?1%")
  Page<Inventory> findByContaining(String search, Pageable paging);
}
