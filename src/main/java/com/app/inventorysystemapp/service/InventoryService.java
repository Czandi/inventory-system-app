package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.Device;
import com.app.inventorysystemapp.model.Inventory;
import com.app.inventorysystemapp.model.InventoryItem;
import com.app.inventorysystemapp.model.Room;
import com.app.inventorysystemapp.repository.InventoryItemRepository;
import com.app.inventorysystemapp.repository.InventoryRepository;
import org.springframework.stereotype.Service;

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


  public Inventory insertInventory(Long idRoom, Long[] barcodes) {
    Inventory inventory = insertNewInventory(idRoom);

    for(Long barcode: barcodes){
      Device device = deviceService.findByBarcode(barcode);
      insertInventoryItem(inventory, device);
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
}
