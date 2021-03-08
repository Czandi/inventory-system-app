package com.app.inventorysystemapp.controller.requestModels;

import lombok.Data;

@Data
public class ProductRequest {
  private String serialNumber;
  private long idRoom;
  private long idModel;
  private long idOwner;
  private long idDeviceSet;
  private String inventoryNumber;
  private String comment;
}
