package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.*;
import com.app.inventorysystemapp.repository.InventoryItemRepository;
import com.app.inventorysystemapp.repository.InventoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventoryService {

  private final InventoryRepository inventoryRepository;
  private final InventoryItemRepository inventoryItemRepository;
  private final RoomService roomService;
  private final DeviceService deviceService;

  public InventoryService(InventoryRepository inventoryRepository, InventoryItemRepository inventoryItemRepository, RoomService roomService, DeviceService deviceService) {
    this.inventoryRepository = inventoryRepository;
    this.inventoryItemRepository = inventoryItemRepository;
    this.roomService = roomService;
    this.deviceService = deviceService;
  }


  public Inventory insertInventory(Long idRoom, List<Long> barcodes) {
    Inventory inventory = insertNewInventory(idRoom);

    System.out.println(barcodes);

    for(int i = 0; i < barcodes.size(); i++){
      Device device = deviceService.findByBarcode(barcodes.get(i));
      if(device != null){
        insertInventoryItem(inventory, device);
      }
    }

    return inventory;
  }

  public Inventory insertNewInventory(Long idRoom){
    Inventory inventory = new Inventory();

    Room room = roomService.findRoomById(idRoom);
    inventory.setRoom(room);
    return inventoryRepository.save(inventory);
  }

  public InventoryItem insertInventoryItem(Inventory inventory, Device record){
    InventoryItem inventoryItem = new InventoryItem();
    inventoryItem.setDevice(record);
    inventoryItem.setInventory(inventory);
    return inventoryItemRepository.save(inventoryItem);
  }

  public Page<Inventory> getInventories(int page, int pageSize, String orderBy, String sortType, String search) {
    Pageable paging;
    int pageNumber = page > 0 ? page : 1;

    if(orderBy != null){

      String orderValue = orderBy;

      switch(orderBy){
        case "room":
          orderValue = "room.name";
          break;
      }

      String type = "";

      if(sortType == null){
        type = "desc";
      }else{
        type = sortType;
      }

      if(type.equals("desc")){
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(orderValue).descending());
      }else{
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(orderValue));
      }

    }else{
      paging = PageRequest.of(pageNumber-1, pageSize);
    }

    if(search == null){
      return inventoryRepository.findAll(paging);
    }else{
      return inventoryRepository.findByContaining(search, paging);
    }
  }

  public Report getReport(long id) {
    Report report = new Report();
    Inventory inventory = inventoryRepository.findById(id).orElseThrow();

    List<Device> previousStock = deviceService.getDevicesFromRoom(inventory.getRoom());
    List<InventoryItem> inventoryItems = inventoryItemRepository.findByInventory(inventory);
    List<Device> actualStock = new ArrayList<>();

    for(int i = 0; i < inventoryItems.size(); i++){
      actualStock.add(inventoryItems.get(i).getDevice());
    }

    List<Device> missingRecords = new ArrayList<>();

    for(int i = 0; i < previousStock.size(); i++){
      Boolean missing = true;

      for(int j = 0; j < actualStock.size(); j++){

        if(previousStock.get(i) == actualStock.get(j)){
          missing = false;
          break;
        }
      }

      if(missing){
        missingRecords.add(previousStock.get(i));
      }
    }

    List<Device> additionalRecords = new ArrayList<>();


    for(int i = 0; i < actualStock.size(); i++){
      Boolean additional = true;

      for(int j = 0; j < previousStock.size(); j++){

        if(actualStock.get(i) == previousStock.get(j)){
          additional = false;
          break;
        }
      }

      if(additional){
        additionalRecords.add(actualStock.get(i));
      }
    }

    report.setActualStock(actualStock);
    report.setPreviousStock(previousStock);
    report.setMissingRecords(missingRecords);
    report.setAdditionalRecords(additionalRecords);
    report.setDate(inventory.getDate());
    report.setRoom(inventory.getRoom().getName());

    return report;
  }
}
