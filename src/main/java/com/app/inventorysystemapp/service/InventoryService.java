package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.controller.dto.InventoryDto;
import com.app.inventorysystemapp.controller.dto.InventoryItemDto;
import com.app.inventorysystemapp.controller.mapper.InventoryMapper;
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

    List<Product> oldState = getOldStateProducts(recordType, idRecord);

    for(int i = 0; i < oldState.size(); i++) {
      insertInventoryItem(inventory, oldState.get(i), "previous");
    }

    for(int i = 0; i < barcodes.size(); i++){
      Product product = productService.findByBarcode(barcodes.get(i));
      if(product != null){
        insertInventoryItem(inventory, product, "actual");
        if(recordType.equals("owner")) {
          Owner owner = ownerService.findOwnerById(idRecord);
          updateOwnerDevice(product, owner);
        }else if(recordType.equals("room")) {
          Room room = roomService.findRoomById(idRecord);
          updateRoomDevice(product, room);
        }
      }
    }

    return inventory;
  }

  public List<Product> getOldStateProducts(String recordType, Long idRecord) {
    if(recordType.equals("owner")) {
      Owner owner = ownerService.findOwnerById(idRecord);
      return productService.findByOwner(owner);
    }else if(recordType.equals("room")) {
      Room room = roomService.findRoomById(idRecord);
      return productService.findByRoom(room);
    }

    return null;
  }

  public void updateOwnerDevice(Product product, Owner owner) {
    product.setOwner(owner);
    productService.saveProduct(product);
  }

  public void updateRoomDevice(Product product, Room room) {
    product.setRoom(room);
    productService.saveProduct(product);
  }

  public Inventory insertNewInventory(Long idRecord, String recordType){
    Inventory inventory = new Inventory();
    inventory.setIdRecord(idRecord);
    inventory.setRecordType(recordType);
    return inventoryRepository.save(inventory);
  }

  public InventoryItem insertInventoryItem(Inventory inventory, Product record, String stateType){
    InventoryItem inventoryItem = new InventoryItem();
    inventoryItem.setInventory(inventory);
    inventoryItem.setInventoryNumber(record.getInventoryNumber());
    inventoryItem.setModel(record.getModel().getName());
    inventoryItem.setType(record.getModel().getType().getName());
    inventoryItem.setStockType(stateType);
    return inventoryItemRepository.save(inventoryItem);
  }

  public Page<InventoryDto> getInventories(int page, int pageSize, String orderBy, String sortType, String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    Page<Inventory> inventories = null;

    if(search == null){
      inventories = inventoryRepository.findAll(paging);
    }else{
      inventories = inventoryRepository.findByContaining(search, paging);
    }

    return inventories.map(inventory -> {
      String recordName = "";
      if(inventory.getRecordType().equals("room")){
        recordName = roomService.findRoomById(inventory.getIdRecord()).getName();
      }else if(inventory.getRecordType().equals("owner")){
        recordName = ownerService.findOwnerById(inventory.getIdRecord()).getName();
      }
      return InventoryMapper.mapToInventoryDto(inventory, recordName);
    });

  }

  public Report getReport(long id) {
    Report report = new Report();
    Inventory inventory = inventoryRepository.findById(id).orElseThrow();
    List<InventoryItem> inventoryItems = inventoryItemRepository.findByInventory(inventory);
    List<InventoryItemDto> previousStock = getStock(inventoryItems, "previous");
    List<InventoryItemDto> actualStock = getStock(inventoryItems, "actual");
    String recordName = "";

    if(inventory.getRecordType().equals("room")) {
      Room room = roomService.findRoomById(inventory.getIdRecord());
      recordName = room.getName();
    } else if (inventory.getRecordType().equals("owner")) {
      Owner owner = ownerService.findOwnerById(inventory.getIdRecord());
      recordName = owner.getName();
    }

    List<InventoryItemDto> missingRecords = getDifferentProducts(previousStock, actualStock);
    List<InventoryItemDto> additionalRecords = getDifferentProducts(actualStock, previousStock);

    report.setActualStock(actualStock);
    report.setPreviousStock(previousStock);
    report.setMissingRecords(missingRecords);
    report.setAdditionalRecords(additionalRecords);
    report.setDate(inventory.getDate());
    report.setRecordName(recordName);

    return report;
  }

  public List<InventoryItemDto> getStock(List<InventoryItem> inventoryItems, String stockType) {
    List<InventoryItemDto> stock = new ArrayList<>();

    for(int i = 0; i < inventoryItems.size(); i++) {
      InventoryItem inventoryItem = inventoryItems.get(i);
      if(inventoryItem.getStockType().equals(stockType)) {
        InventoryItemDto inventoryItemDto = InventoryMapper.mapToInventoryItemDto(inventoryItem);
        stock.add(inventoryItemDto);
      }
    }

    return stock;
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
