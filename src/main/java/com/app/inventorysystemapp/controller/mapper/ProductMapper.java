package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.DeletedProductDto;
import com.app.inventorysystemapp.controller.dto.ProductDto;
import com.app.inventorysystemapp.model.DeletedProduct;
import com.app.inventorysystemapp.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {

  private ProductMapper(){
  }

  public static Page<ProductDto> mapToProductDtos(Page<Product> devices) {
    return devices.map(device -> mapToProductDto(device));
  }

  public static List<ProductDto> mapToProductDtos(List<Product> products) {
    return products.stream().map(device -> mapToProductDto(device)).collect(Collectors.toList());
  }

  public static ProductDto mapToProductDto(Product product) {
    return ProductDto.builder()
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

//  public static Page<DeletedProductDto> mapToDeletedProductDtos(Page<DeletedProduct> devices){
//    return devices.map(device -> mapToDeletedProductDto(device));
//  }
//
//  public static DeletedProductDto mapToDeletedProductDto(DeletedProduct device) {
//    return DeletedProductDto.builder()
//      .id(device.getId())
//      .serialNumber(device.getSerialNumber())
//      .room(device.getRoom().getName())
//      .model(device.getModel().getName())
//      .owner(device.getOwner().getName())
//      .type(device.getModel().getType().getName())
//      .deviceSet(device.getProductSet().getName())
//      .barCode(device.getBarCode())
//      .comments(device.getComments())
//      .deletedDate(device.getDeletedDate())
//      .build();
//  }
}
