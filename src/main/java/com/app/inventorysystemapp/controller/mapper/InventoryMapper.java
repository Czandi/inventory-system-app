package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.InventoryDto;
import com.app.inventorysystemapp.model.Inventory;
import org.springframework.data.domain.Page;

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
}
