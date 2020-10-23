package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.DeviceSet;
import com.app.inventorysystemapp.model.interfaces.IDeviceSet;
import com.app.inventorysystemapp.repository.DeviceSetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceSetService {

  private final DeviceSetRepository deviceSetRepository;

  public DeviceSetService(DeviceSetRepository deviceSetRepository) {
    this.deviceSetRepository = deviceSetRepository;
  }

  public Page<IDeviceSet> getDeviceSets(int page,
                                        int pageSize,
                                        String orderBy,
                                        String sortType,
                                        String search) {
    Pageable paging;
    int pageNumber = page > 0 ? page : 1;

    if(orderBy != null){

      String order = orderBy;

      switch(orderBy){
        case "name":
          order = "deviceSetName";
          break;
        case "count":
          order = "itemsCount";
          break;
      }

      String type = "";

      if(sortType == null){
        type = "desc";
      }else{
        type = sortType;
      }

      if(type.equals("desc")){
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(order).descending());
      }else{
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(order));
      }

    }else{
      paging = PageRequest.of(pageNumber-1, pageSize);
    }

    if(search == null) {
      return deviceSetRepository.findAllDevicesSetWithCount(paging);
    }else{
      return deviceSetRepository.findAllDevicesSetWithCountByContaining(search, paging);
    }

  }

  public List<DeviceSet> getAllDeviceSets() {
    return deviceSetRepository.findAll();
  }
}
