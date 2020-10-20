package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.interfaces.IDeviceType;
import com.app.inventorysystemapp.repository.DeviceTypeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DeviceTypeService {

  private final DeviceTypeRepository deviceTypeRepository;

  public DeviceTypeService(DeviceTypeRepository deviceTypeRepository) {
    this.deviceTypeRepository = deviceTypeRepository;
  }

  public Page<IDeviceType> getDeviceTypes(int page,
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
          order = "deviceTypeName";
          break;
        case "count":
          order = "deviceTypeCount";
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
      return deviceTypeRepository.findAllDeviceTypesWithCount(paging);
    }else{
      return deviceTypeRepository.findAllDeviceTypesWithCountByContaining(search, paging);
    }
  }
}
