package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

@Data
@Builder
public class DeviceDto {
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
