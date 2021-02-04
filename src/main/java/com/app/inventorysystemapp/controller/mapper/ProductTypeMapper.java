package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.ProductTypeDto;
import com.app.inventorysystemapp.model.interfaces.IProductType;
import org.springframework.data.domain.Page;

public class ProductTypeMapper {

  public static Page<ProductTypeDto> mapToProductTypeDtos(Page<IProductType> deviceTypes) {
    return deviceTypes.map(deviceType -> mapToProductTypeDto(deviceType));
  }

  public static ProductTypeDto mapToProductTypeDto(IProductType deviceType) {
    return ProductTypeDto.builder()
      .id(deviceType.getDeviceTypeId())
      .name(deviceType.getDeviceTypeName())
      .count(deviceType.getDeviceTypeCount())
      .build();
  }
}
