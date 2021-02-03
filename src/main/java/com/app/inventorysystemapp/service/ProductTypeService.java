package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.ProductType;
import com.app.inventorysystemapp.model.interfaces.IProductType;
import com.app.inventorysystemapp.repository.DeviceTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeService implements com.app.inventorysystemapp.service.Service {

  private final DeviceTypeRepository deviceTypeRepository;
  private final HistoryService historyService;

  public ProductTypeService(DeviceTypeRepository deviceTypeRepository, HistoryService historyService) {
    this.deviceTypeRepository = deviceTypeRepository;
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
      return deviceTypeRepository.findAllDeviceTypesWithCount(paging);
    }else{
      return deviceTypeRepository.findAllDeviceTypesWithCountByContaining(search, paging);
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
    return deviceTypeRepository.findAll();
  }

  public ProductType findTypeById(Long id){
    return deviceTypeRepository.findById(id).orElseThrow();
  }

  public ProductType insertDeviceType(ProductType productType) {
    return deviceTypeRepository.save(productType);
  }

  public IProductType getSingleDeviceType(long id) {
    return deviceTypeRepository.findByIdWithCount(id);
  }

  public ResponseEntity<ProductType> updateDeviceType(long id, String name) {
    ProductType productType = deviceTypeRepository.findById(id).orElseThrow();

    if(!productType.getName().equals(name)){
      historyService.insertHistory("type", productType.getId(), "name", productType.getName(), name);
    }

    productType.setName(name);

    final ProductType updatedProductType = deviceTypeRepository.save(productType);
    return ResponseEntity.ok(updatedProductType);
  }
}
