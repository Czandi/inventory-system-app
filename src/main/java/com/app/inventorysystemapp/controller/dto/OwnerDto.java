package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OwnerDto {
  Long id;
  String name;
  String surname;
  Integer itemsCount;
}
