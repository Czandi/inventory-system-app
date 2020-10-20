package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.DeviceSetDto;
import com.app.inventorysystemapp.model.interfaces.IDeviceSet;
import org.springframework.data.domain.Page;

public class DeviceSetDtoMapper {

  public static Page<DeviceSetDto> mapToDeviceSetDtos(Page<IDeviceSet> deviceSets) {
    return deviceSets.map(deviceSet -> mapToDeviceSetDto(deviceSet));
  }

  private static DeviceSetDto mapToDeviceSetDto(IDeviceSet deviceSet) {
    return DeviceSetDto.builder()
      .id(deviceSet.getDeviceSetId())
      .name(deviceSet.getDeviceSetName())
      .itemsCount(deviceSet.getItemsCount())
      .build();
  }

}
