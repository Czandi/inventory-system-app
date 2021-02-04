package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.ProductSetDto;
import com.app.inventorysystemapp.model.interfaces.IProductSet;
import org.springframework.data.domain.Page;

public class ProductSetMapper {

  public static Page<ProductSetDto> mapToProductSetDtos(Page<IProductSet> deviceSets) {
    return deviceSets.map(deviceSet -> mapToProductSetDto(deviceSet));
  }

  public static ProductSetDto mapToProductSetDto(IProductSet deviceSet) {
    return ProductSetDto.builder()
      .id(deviceSet.getProductSetId())
      .name(deviceSet.getProductSetName())
      .count(deviceSet.getItemsCount())
      .build();
  }

}
