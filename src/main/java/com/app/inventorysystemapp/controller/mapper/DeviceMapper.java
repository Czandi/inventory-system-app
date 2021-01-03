package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.DeletedDeviceDto;
import com.app.inventorysystemapp.controller.dto.DeviceDto;
import com.app.inventorysystemapp.model.DeletedDevice;
import com.app.inventorysystemapp.model.Device;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class DeviceMapper {

  private DeviceMapper(){
  }

  public static Page<DeviceDto> mapToDeviceDtos(Page<Device> devices) {
    return devices.map(device -> mapToDeviceDto(device));
  }

  public static List<DeviceDto> mapToDeviceDtos(List<Device> devices) {
    return devices.stream().map(device -> mapToDeviceDto(device)).collect(Collectors.toList());
  }

  public static DeviceDto mapToDeviceDto(Device device) {
    return DeviceDto.builder()
      .id(device.getId())
      .serialNumber(device.getSerialNumber())
      .room(device.getRoom().getName())
      .model(device.getModel().getName())
      .owner(device.getOwner().getName())
      .type(device.getModel().getType().getName())
      .deviceSet(device.getDeviceSet().getName())
      .barCode(device.getBarCode())
      .comments(device.getComments())
      .build();
  }

  public static Page<DeletedDeviceDto> mapToDeletedDeviceDtos(Page<DeletedDevice> devices){
    return devices.map(device -> mapToDeletedDeviceDto(device));
  }

  public static DeletedDeviceDto mapToDeletedDeviceDto(DeletedDevice device) {
    return DeletedDeviceDto.builder()
      .id(device.getId())
      .serialNumber(device.getSerialNumber())
      .room(device.getRoom().getName())
      .model(device.getModel().getName())
      .owner(device.getOwner().getName())
      .type(device.getModel().getType().getName())
      .deviceSet(device.getDeviceSet().getName())
      .barCode(device.getBarCode())
      .comments(device.getComments())
      .deletedDate(device.getDeletedDate())
      .build();
  }
}
