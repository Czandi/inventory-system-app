package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.HistoryDeviceDto;
import com.app.inventorysystemapp.model.interfaces.IHistoryProduct;
import org.springframework.data.domain.Page;

public class HistoryMapper {

  public static Page<HistoryDeviceDto> mapToHistoryDeviceDtos(Page<IHistoryProduct> devicesHistory) {
    return devicesHistory.map(deviceHistory -> mapToDeviceHistoryDto(deviceHistory));
  }

  private static HistoryDeviceDto mapToDeviceHistoryDto(IHistoryProduct deviceHistory) {
    return HistoryDeviceDto.builder()
      .barCode(deviceHistory.getBarCode())
      .changedAttribute(deviceHistory.getChangedAttribute())
      .date(deviceHistory.getDate())
      .newValue(deviceHistory.getNewValue())
      .oldValue(deviceHistory.getOldValue())
      .serialNumber(deviceHistory.getSerialNumber())
      .build();
  }

}
