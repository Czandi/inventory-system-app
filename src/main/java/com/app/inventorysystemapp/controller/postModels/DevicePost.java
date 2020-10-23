package com.app.inventorysystemapp.controller.postModels;

import lombok.Data;

@Data
public class DevicePost {
  private String serialNumber;
  private long idRoom;
  private long idModel;
  private long idOwner;
  private long idDeviceSet;
  private String comment;
}
