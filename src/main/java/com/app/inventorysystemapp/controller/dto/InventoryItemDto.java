package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class InventoryItemDto {
  private String inventoryNumber;
  private String model;
  private String type;
}
