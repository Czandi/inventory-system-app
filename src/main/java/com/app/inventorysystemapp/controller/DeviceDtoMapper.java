package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeviceDto;
import com.app.inventorysystemapp.model.Device;
import org.springframework.data.domain.Page;

public class DeviceDtoMapper {

  private DeviceDtoMapper(){
  }

  public static Page<DeviceDto> mapToDeviceDtos(Page<Device> devices) {
    return devices.map(device -> mapToDeviceDto(device));
  }

  public static DeviceDto mapToDeviceDto(Device device) {
    return DeviceDto.builder()
      .id(device.getId())
      .serialNumber(device.getSerialNumber())
      .room(device.getRoom().getName())
      .model(device.getModel().getName())
      .owner(device.getOwner().getName())
      .type(device.getType().getName())
      .deviceSet(device.getDeviceSet().getName())
      .barCode(device.getBarCode())
      .comments(device.getComments())
      .build();
  }
}
