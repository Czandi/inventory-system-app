package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.DeviceSetDto;
import com.app.inventorysystemapp.model.interfaces.IProductSet;
import org.springframework.data.domain.Page;

public class DeviceSetMapper {

  public static Page<DeviceSetDto> mapToDeviceSetDtos(Page<IProductSet> deviceSets) {
    return deviceSets.map(deviceSet -> mapToDeviceSetDto(deviceSet));
  }

  public static DeviceSetDto mapToDeviceSetDto(IProductSet deviceSet) {
    return DeviceSetDto.builder()
      .id(deviceSet.getProductSetId())
      .name(deviceSet.getProductSetName())
      .count(deviceSet.getItemsCount())
      .build();
  }

}
