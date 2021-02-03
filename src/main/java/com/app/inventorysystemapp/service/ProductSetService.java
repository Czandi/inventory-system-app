package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.ProductSet;
import com.app.inventorysystemapp.model.interfaces.IProductSet;
import com.app.inventorysystemapp.repository.ProductSetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSetService implements com.app.inventorysystemapp.service.Service {

  private final ProductSetRepository productSetRepository;
  private final HistoryService historyService;

  public ProductSetService(ProductSetRepository productSetRepository, HistoryService historyService) {
    this.productSetRepository = productSetRepository;
    this.historyService = historyService;
  }

  public Page<IProductSet> getProductSets(int page,
                                          int pageSize,
                                          String orderBy,
                                          String sortType,
                                          String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    if (search == null) {
      return productSetRepository.findAllProductsSetWithCount(paging);
    } else {
      return productSetRepository.findAllProductsSetWithCountByContaining(search, paging);
    }
  }

  @Override
  public String generateOrderValue(String orderBy) {
    switch (orderBy) {
      case "name":
        return "productSetName";
      case "count":
        return "itemsCount";
      default:
        return orderBy;
    }
  }

  public List<ProductSet> getAllDeviceSets() {
    return productSetRepository.findAll();
  }

  public ProductSet insertDeviceSet(ProductSet productSet) {
    return productSetRepository.save(productSet);
  }

  public ProductSet findDeviceSetById(long id) {
    return productSetRepository.findById(id).orElseThrow();
  }

  public IProductSet getSingleDeviceSet(long id) {
    return productSetRepository.findByIdWithCount(id);
  }

  public ResponseEntity<ProductSet> updateDeviceSet(long id, String name) {
    ProductSet productSet = productSetRepository.findById(id).orElseThrow();

    if (!productSet.getName().equals(name)) {
      historyService.insertHistory("device_set", productSet.getId(), "name", productSet.getName(), name);
    }

    productSet.setName(name);

    final ProductSet updatedProductSet = productSetRepository.save(productSet);
    return ResponseEntity.ok(updatedProductSet);
  }

  public ProductSet findById(long id) {
    return productSetRepository.findById(id).orElseThrow();
  }

  public void deleteDeviceSet(Long id) {
    ProductSet productSet = findById(id);
    productSetRepository.delete(productSet);
  }
}
