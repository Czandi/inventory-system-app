package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.HistoryProductDto;
import com.app.inventorysystemapp.model.interfaces.IHistoryProduct;
import org.springframework.data.domain.Page;

public class HistoryMapper {

  public static Page<HistoryProductDto> mapToHistoryDeviceDtos(Page<IHistoryProduct> devicesHistory) {
    return devicesHistory.map(deviceHistory -> mapToDeviceHistoryDto(deviceHistory));
  }

  private static HistoryProductDto mapToDeviceHistoryDto(IHistoryProduct deviceHistory) {
    return HistoryProductDto.builder()
      .barCode(deviceHistory.getBarCode())
      .changedAttribute(deviceHistory.getChangedAttribute())
      .date(deviceHistory.getDate())
      .newValue(deviceHistory.getNewValue())
      .oldValue(deviceHistory.getOldValue())
      .serialNumber(deviceHistory.getSerialNumber())
      .build();
  }

}
