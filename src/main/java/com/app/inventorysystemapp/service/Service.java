package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.Device;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

public interface Service {

  default PageRequest generatePageRequest(Integer pageNumber, Integer pageSize, String orderBy, String sortType){
    if (orderBy != null) {
      String order = generateOrderValue(orderBy);
      String type = generateSortValue(sortType);
      return generateSortPageRequest(pageNumber, pageSize, order, type);
    } else {
      return PageRequest.of(pageNumber - 1, pageSize);
    }
  }

  default PageRequest generateSortPageRequest(Integer pageNumber, Integer pageSize, String orderBy, String sortType){
    if(sortType.equals("desc")){
      return PageRequest.of(pageNumber - 1, pageSize, Sort.by(orderBy).descending());
    }else{
      return PageRequest.of(pageNumber - 1, pageSize, Sort.by(orderBy));
    }
  }

  default String generateSortValue(String sortType){
    if(sortType == null){
      return "desc";
    }else{
      return sortType;
    }
  }

  default List<Device> getDifferentDevices(List<Device> array1, List<Device> array2) {
    List<Device> devices = new ArrayList<>();

    for(int i = 0; i < array1.size(); i++){
      Boolean additional = true;

      for(int j = 0; j < array2.size(); j++){

        if(array1.get(i) == array2.get(j)){
          additional = false;
          break;
        }
      }

      if(additional){
        devices.add(array1.get(i));
      }
    }

    return devices;
  }

  String generateOrderValue(String orderBy);
}
