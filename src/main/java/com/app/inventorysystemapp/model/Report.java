package com.app.inventorysystemapp.model;

import com.app.inventorysystemapp.controller.dto.InventoryItemDto;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class Report {
  private LocalDate date;
  private String recordName;
  private List<InventoryItemDto> missingRecords;
  private List<InventoryItemDto> additionalRecords;
  private List<InventoryItemDto> actualStock;
  private List<InventoryItemDto> previousStock;
}
