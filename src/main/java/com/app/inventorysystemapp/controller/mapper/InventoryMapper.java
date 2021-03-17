package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.InventoryDto;
import com.app.inventorysystemapp.controller.dto.InventoryItemDto;
import com.app.inventorysystemapp.model.Inventory;
import com.app.inventorysystemapp.model.InventoryItem;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class InventoryMapper {

  private InventoryMapper(){}

//  public static Page<InventoryDto> mapToInventoryDtos(Page<Inventory> inventories){
//    return inventories.map(inventory -> mapToInventoryDto(inventory));
//  }

  public static InventoryDto mapToInventoryDto(Inventory inventory, String recordName) {
    return InventoryDto.builder()
      .id(inventory.getId())
      .recordName(recordName)
      .date(inventory.getDate())
      .build();
  }

  public static List<InventoryItemDto> mapToInventoryItemDtos(List<InventoryItem> inventoryItems) {
    return inventoryItems.stream().map(inventoryItem -> mapToInventoryItemDto(inventoryItem)).collect(Collectors.toList());
  }

  public static InventoryItemDto mapToInventoryItemDto(InventoryItem inventoryItem) {
    return InventoryItemDto.builder()
      .inventoryNumber(inventoryItem.getInventoryNumber())
      .type(inventoryItem.getType())
      .model(inventoryItem.getModel())
      .build();
  }
}
