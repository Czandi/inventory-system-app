package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelDto {
  private long id;

  private String name;

  private String type;

  private int count;
}
