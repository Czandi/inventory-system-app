package com.app.inventorysystemapp.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
  private long id;

  private String serialNumber;

  private String room;

  private String model;

  private String owner;

  private String type;

  private String deviceSet;

  private long barCode;

  private String comments;
}
