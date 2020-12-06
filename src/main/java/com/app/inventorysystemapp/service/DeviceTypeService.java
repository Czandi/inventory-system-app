package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.DeviceType;
import com.app.inventorysystemapp.model.interfaces.IDeviceType;
import com.app.inventorysystemapp.repository.DeviceTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceTypeService implements com.app.inventorysystemapp.service.Service {

  private final DeviceTypeRepository deviceTypeRepository;
  private final HistoryService historyService;

  public DeviceTypeService(DeviceTypeRepository deviceTypeRepository, HistoryService historyService) {
    this.deviceTypeRepository = deviceTypeRepository;
    this.historyService = historyService;
  }

  public Page<IDeviceType> getDeviceTypes(int page,
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

  public List<DeviceType> getAllDeviceTypes() {
    return deviceTypeRepository.findAll();
  }

  public DeviceType findTypeById(Long id){
    return deviceTypeRepository.findById(id).orElseThrow();
  }

  public DeviceType insertDeviceType(DeviceType deviceType) {
    return deviceTypeRepository.save(deviceType);
  }

  public IDeviceType getSingleDeviceType(long id) {
    return deviceTypeRepository.findByIdWithCount(id);
  }

  public ResponseEntity<DeviceType> updateDeviceType(long id, String name) {
    DeviceType deviceType = deviceTypeRepository.findById(id).orElseThrow();

    if(!deviceType.getName().equals(name)){
      historyService.insertHistory("type", deviceType.getId(), "name", deviceType.getName(), name);
    }

    deviceType.setName(name);

    final DeviceType updatedDeviceType = deviceTypeRepository.save(deviceType);
    return ResponseEntity.ok(updatedDeviceType);
  }
}
