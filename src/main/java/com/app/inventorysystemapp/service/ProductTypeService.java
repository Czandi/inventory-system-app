package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.ProductType;
import com.app.inventorysystemapp.model.interfaces.IProductType;
import com.app.inventorysystemapp.repository.ProductTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeService implements com.app.inventorysystemapp.service.Service {

  private final ProductTypeRepository productTypeRepository;
  private final HistoryService historyService;

  public ProductTypeService(ProductTypeRepository productTypeRepository, HistoryService historyService) {
    this.productTypeRepository = productTypeRepository;
    this.historyService = historyService;
  }

  public Page<IProductType> getDeviceTypes(int page,
                                           int pageSize,
                                           String orderBy,
                                           String sortType,
                                           String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    if(search == null) {
      return productTypeRepository.findAllDeviceTypesWithCount(paging);
    }else{
      return productTypeRepository.findAllDeviceTypesWithCountByContaining(search, paging);
    }
  }

  @Override
  public String generateOrderValue(String orderBy) {
    switch(orderBy){
      case "name":
        return "deviceTypeName";
      case "count":
        return "deviceTypeCount";
      default:
        return orderBy;
    }
  }

  public List<ProductType> getAllDeviceTypes() {
    return productTypeRepository.findAll();
  }

  public ProductType findTypeById(Long id){
    return productTypeRepository.findById(id).orElseThrow();
  }

  public ProductType insertDeviceType(ProductType productType) {
    return productTypeRepository.save(productType);
  }

  public IProductType getSingleDeviceType(long id) {
    return productTypeRepository.findByIdWithCount(id);
  }

  public ResponseEntity<ProductType> updateDeviceType(long id, String name) {
    ProductType productType = productTypeRepository.findById(id).orElseThrow();

    if(!productType.getName().equals(name)){
      historyService.insertHistory("type", productType.getId(), "name", productType.getName(), name);
    }

    productType.setName(name);

    final ProductType updatedProductType = productTypeRepository.save(productType);
    return ResponseEntity.ok(updatedProductType);
  }
}
