package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.model.Inventory;
import com.app.inventorysystemapp.service.InventoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class InventoryController {

  private final InventoryService inventoryService;

  public InventoryController(InventoryService inventoryService) {
    this.inventoryService = inventoryService;
  }

  @PostMapping("/inventory")
  public Inventory insertInventory(Long idRoom, Long[] barcodes){
    System.out.println(idRoom);
    return inventoryService.insertInventory(idRoom, barcodes);
  }
}
