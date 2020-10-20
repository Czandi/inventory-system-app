package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeviceTypeDto {
  Long id;
  String name;
  Integer count;
}
