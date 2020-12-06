package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.DeviceSet;
import com.app.inventorysystemapp.model.interfaces.IDeviceSet;
import com.app.inventorysystemapp.repository.DeviceSetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceSetService implements com.app.inventorysystemapp.service.Service {

  private final DeviceSetRepository deviceSetRepository;
  private final HistoryService historyService;

  public DeviceSetService(DeviceSetRepository deviceSetRepository, HistoryService historyService) {
    this.deviceSetRepository = deviceSetRepository;
    this.historyService = historyService;
  }

  public Page<IDeviceSet> getDeviceSets(int page,
                                        int pageSize,
                                        String orderBy,
                                        String sortType,
                                        String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    if (search == null) {
      return deviceSetRepository.findAllDevicesSetWithCount(paging);
    } else {
      return deviceSetRepository.findAllDevicesSetWithCountByContaining(search, paging);
    }
  }

  @Override
  public String generateOrderValue(String orderBy) {
    switch (orderBy) {
      case "name":
        return "deviceSetName";
      case "count":
        return "itemsCount";
      default:
        return orderBy;
    }
  }

  public List<DeviceSet> getAllDeviceSets() {
    return deviceSetRepository.findAll();
  }

  public DeviceSet insertDeviceSet(DeviceSet deviceSet) {
    return deviceSetRepository.save(deviceSet);
  }

  public DeviceSet findDeviceSetById(long id) {
    return deviceSetRepository.findById(id).orElseThrow();
  }

  public IDeviceSet getSingleDeviceSet(long id) {
    return deviceSetRepository.findByIdWithCount(id);
  }

  public ResponseEntity<DeviceSet> updateDeviceSet(long id, String name) {
    DeviceSet deviceSet = deviceSetRepository.findById(id).orElseThrow();

    if (!deviceSet.getName().equals(name)) {
      historyService.insertHistory("device_set", deviceSet.getId(), "name", deviceSet.getName(), name);
    }

    deviceSet.setName(name);

    final DeviceSet updatedDeviceSet = deviceSetRepository.save(deviceSet);
    return ResponseEntity.ok(updatedDeviceSet);
  }
}
