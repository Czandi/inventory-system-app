package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeviceSetDto {
  private long id;
  private String name;
  private int itemsCount;
}
