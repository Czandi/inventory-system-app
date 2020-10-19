package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.DeviceSet;
import com.app.inventorysystemapp.repository.DeviceSetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DeviceSetService {

  private final DeviceSetRepository deviceSetRepository;

  public DeviceSetService(DeviceSetRepository deviceSetRepository) {
    this.deviceSetRepository = deviceSetRepository;
  }

  public Page<DeviceSet> getDeviceSet(int page, int pageSize, String orderBy, String sortType, String search) {
    Pageable paging;

    if(orderBy != null){

      String type = "";

      if(sortType == null){
        type = "desc";
      }else{
        type = sortType;
      }

      if(type.equals("desc")){
        paging = PageRequest.of(page, pageSize, Sort.by(orderBy).descending());
      }else{
        paging = PageRequest.of(page, pageSize, Sort.by(orderBy));
      }

    }else{
      paging = PageRequest.of(page, pageSize);
    }

    if(search == null) {
      return deviceSetRepository.findAll(paging);
    }else{
      return deviceSetRepository.findByContaining(search, paging);
    }

  }

}
