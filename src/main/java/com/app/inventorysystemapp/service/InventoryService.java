package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.*;
import com.app.inventorysystemapp.repository.InventoryItemRepository;
import com.app.inventorysystemapp.repository.InventoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventoryService implements com.app.inventorysystemapp.service.Service {

  private final InventoryRepository inventoryRepository;
  private final InventoryItemRepository inventoryItemRepository;
  private final RoomService roomService;
  private final OwnerService ownerService;
  private final ProductService productService;

  public InventoryService(InventoryRepository inventoryRepository, InventoryItemRepository inventoryItemRepository, RoomService roomService, OwnerService ownerService, ProductService productService) {
    this.inventoryRepository = inventoryRepository;
    this.inventoryItemRepository = inventoryItemRepository;
    this.roomService = roomService;
    this.ownerService = ownerService;
    this.productService = productService;
  }


  public Inventory insertInventory(Long idRecord, String recordType, List<Long> barcodes) {
    Inventory inventory = insertNewInventory(idRecord, recordType);

    for(int i = 0; i < barcodes.size(); i++){
      Product product = productService.findByBarcode(barcodes.get(i));
      if(product != null){
        insertInventoryItem(inventory, product);
      }
    }

    return inventory;
  }

  public Inventory insertNewInventory(Long idRecord, String recordType){
    Inventory inventory = new Inventory();
    inventory.setIdRecord(idRecord);
    inventory.setRecordType(recordType);
    return inventoryRepository.save(inventory);
  }

  public InventoryItem insertInventoryItem(Inventory inventory, Product record){
    InventoryItem inventoryItem = new InventoryItem();
    inventoryItem.setProduct(record);
    inventoryItem.setInventory(inventory);
    return inventoryItemRepository.save(inventoryItem);
  }

  public Page<Inventory> getInventories(int page, int pageSize, String orderBy, String sortType, String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    if(search == null){
      return inventoryRepository.findAll(paging);
    }else{
      return inventoryRepository.findByContaining(search, paging);
    }
  }

  public Report getReport(long id) {
    Report report = new Report();
    Inventory inventory = inventoryRepository.findById(id).orElseThrow();
    List<Product> previousStock = null;
    String recordName = "";

    if(inventory.getRecordType().equals("room")) {
      Room room = roomService.findRoomById(inventory.getIdRecord());
      previousStock = productService.getDevicesFromRoom(room);
      System.out.println(previousStock.get(0));
      recordName = room.getName();
    } else if (inventory.getRecordType().equals("owner")) {
      Owner owner = ownerService.findOwnerById(inventory.getIdRecord());
      previousStock = productService.getDevicesFromOwner(owner);
      System.out.println(previousStock.get(0));

      recordName = owner.getName();
    }


    List<InventoryItem> inventoryItems = inventoryItemRepository.findByInventory(inventory);
    List<Product> actualStock = new ArrayList<>();

    for(int i = 0; i < inventoryItems.size(); i++){
      actualStock.add(inventoryItems.get(i).getProduct());
    }

    List<Product> missingRecords = getDifferentDevices(previousStock, actualStock);
    List<Product> additionalRecords = getDifferentDevices(actualStock, previousStock);

    report.setActualStock(actualStock);
    report.setPreviousStock(previousStock);
    report.setMissingRecords(missingRecords);
    report.setAdditionalRecords(additionalRecords);
    report.setDate(inventory.getDate());
    report.setRecordName(recordName);

    return report;
  }

  @Override
  public String generateOrderValue(String orderBy) {
    switch(orderBy){
      case "room":
        return "room.name";
      default:
        return orderBy;
    }
  }
}
