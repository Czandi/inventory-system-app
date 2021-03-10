package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class InventoryDto {
  private Long id;
  private Long record;
  private LocalDate date;
}
