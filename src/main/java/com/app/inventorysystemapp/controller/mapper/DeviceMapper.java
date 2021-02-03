package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.DeletedDeviceDto;
import com.app.inventorysystemapp.controller.dto.DeviceDto;
import com.app.inventorysystemapp.model.DeletedProduct;
import com.app.inventorysystemapp.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class DeviceMapper {

  private DeviceMapper(){
  }

  public static Page<DeviceDto> mapToDeviceDtos(Page<Product> devices) {
    return devices.map(device -> mapToDeviceDto(device));
  }

  public static List<DeviceDto> mapToDeviceDtos(List<Product> products) {
    return products.stream().map(device -> mapToDeviceDto(device)).collect(Collectors.toList());
  }

  public static DeviceDto mapToDeviceDto(Product product) {
    return DeviceDto.builder()
      .id(product.getId())
      .serialNumber(product.getSerialNumber())
      .room(product.getRoom().getName())
      .model(product.getModel().getName())
      .owner(product.getOwner().getName())
      .type(product.getModel().getType().getName())
      .deviceSet(product.getProductSet().getName())
      .barCode(product.getBarCode())
      .comments(product.getComments())
      .build();
  }

  public static Page<DeletedDeviceDto> mapToDeletedDeviceDtos(Page<DeletedProduct> devices){
    return devices.map(device -> mapToDeletedDeviceDto(device));
  }

  public static DeletedDeviceDto mapToDeletedDeviceDto(DeletedProduct device) {
    return DeletedDeviceDto.builder()
      .id(device.getId())
      .serialNumber(device.getSerialNumber())
      .room(device.getRoom().getName())
      .model(device.getModel().getName())
      .owner(device.getOwner().getName())
      .type(device.getModel().getType().getName())
      .deviceSet(device.getProductSet().getName())
      .barCode(device.getBarCode())
      .comments(device.getComments())
      .deletedDate(device.getDeletedDate())
      .build();
  }
}
