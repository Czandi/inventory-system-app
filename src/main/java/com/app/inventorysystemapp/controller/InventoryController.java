package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.InventoryDto;
import com.app.inventorysystemapp.controller.mapper.InventoryMapper;
import com.app.inventorysystemapp.model.Inventory;
import com.app.inventorysystemapp.model.Report;
import com.app.inventorysystemapp.model.interfaces.IReport;
import com.app.inventorysystemapp.service.InventoryService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class InventoryController {

  private final InventoryService inventoryService;

  public InventoryController(InventoryService inventoryService) {
    this.inventoryService = inventoryService;
  }

  @GetMapping("/inventory")
  public Page<InventoryDto> getInventories(int page,
                                           int pageSize,
                                           @RequestParam(required = false) String orderBy,
                                           @RequestParam(required = false) String sortType,
                                           @RequestParam(required = false) String search){
    return InventoryMapper.mapToInventoryDtos(inventoryService.getInventories(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/inventory/report/{id}")
  public Report getReport(@PathVariable long id){
    return inventoryService.getReport(id);
  }

  @PostMapping("/inventory")
  public Inventory insertInventory(Long idRoom, @RequestBody List<Long> barcodes){
    System.out.println(barcodes);
    return inventoryService.insertInventory(idRoom, barcodes);
  }
}
