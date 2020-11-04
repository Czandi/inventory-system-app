package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.DeviceTypeDto;
import com.app.inventorysystemapp.model.interfaces.IDeviceType;
import org.springframework.data.domain.Page;

public class DeviceTypeMapper {

  public static Page<DeviceTypeDto> mapToDeviceTypeDtos(Page<IDeviceType> deviceTypes) {
    return deviceTypes.map(deviceType -> mapToDeviceTypeDto(deviceType));
  }

  public static DeviceTypeDto mapToDeviceTypeDto(IDeviceType deviceType) {
    return DeviceTypeDto.builder()
      .id(deviceType.getDeviceTypeId())
      .name(deviceType.getDeviceTypeName())
      .count(deviceType.getDeviceTypeCount())
      .build();
  }
}
