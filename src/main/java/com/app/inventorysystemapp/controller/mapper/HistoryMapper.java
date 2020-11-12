package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.HistoryDeviceDto;
import com.app.inventorysystemapp.model.interfaces.IHistoryDevice;
import org.springframework.data.domain.Page;

public class HistoryMapper {

  public static Page<HistoryDeviceDto> mapToHistoryDeviceDtos(Page<IHistoryDevice> devicesHistory) {
    return devicesHistory.map(deviceHistory -> mapToDeviceHistoryDto(deviceHistory));
  }

  private static HistoryDeviceDto mapToDeviceHistoryDto(IHistoryDevice deviceHistory) {
    return HistoryDeviceDto.builder()
      .barCode(deviceHistory.getBarCode())
      .changedAttribute(deviceHistory.getChangedAttribute())
      .createdDate(deviceHistory.getDate())
      .newValue(deviceHistory.getNewValue())
      .oldValue(deviceHistory.getOldValue())
      .serialNumber(deviceHistory.getSerialNumber())
      .build();
  }

}
