package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductTypeDto {
  Long id;
  String name;
  Integer count;
}
