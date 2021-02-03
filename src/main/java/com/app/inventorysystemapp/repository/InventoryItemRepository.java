package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.Inventory;
import com.app.inventorysystemapp.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
  List<InventoryItem> findByInventory(Inventory inventory);
}
