package com.app.inventorysystemapp.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeletedProductDto {
  private long id;

  private String serialNumber;

  private String room;

  private String model;

  private String owner;

  private String type;

  private String deviceSet;

  private long barCode;

  private String comments;

  private LocalDateTime deletedDate;
}
