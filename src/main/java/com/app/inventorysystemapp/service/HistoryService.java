package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.History;
import com.app.inventorysystemapp.model.interfaces.IHistoryDevice;
import com.app.inventorysystemapp.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {

  private final HistoryRepository historyRepository;

  public HistoryService(HistoryRepository historyRepository) {
    this.historyRepository = historyRepository;
  }

  public Page<History> getHistory(int page,
                                  int pageSize,
                                  String orderBy,
                                  String sortType,
                                  String search) {
    Pageable paging;
    int pageNumber = page > 0 ? page : 1;

    if(orderBy != null){

      String orderValue = orderBy;

      switch(orderBy){
        case "type":
          orderValue = "model." + orderBy;
          break;
      }

      String type = "";

      if(sortType == null){
        type = "desc";
      }else{
        type = sortType;
      }

      if(type.equals("desc")){
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(orderValue).descending());
      }else{
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(orderValue));
      }

    }else{
      paging = PageRequest.of(pageNumber-1, pageSize);
    }

    if(search == null) {
      return historyRepository.findAll(paging);
    }else{
      //TODO
      return historyRepository.findByContaining(search, paging);
    }
  }

  public History insertHistory(String tableName, long idRecord, String changedAttribute, String oldValue, String newValue) {

    History history = new History();

    history.setTableName(tableName);
    history.setIdRecord(idRecord);
    history.setChangedAttribute(changedAttribute);
    history.setOldValue(oldValue);
    history.setNewValue(newValue);

    return historyRepository.save(history);
  }


  public Page<IHistoryDevice> getDevicesHistory(int page, int pageSize, String orderBy, String sortType, String search) {
    Pageable paging;
    int pageNumber = page > 0 ? page : 1;

    if(orderBy != null){

      String order = orderBy;

      switch(orderBy){
        case "name":
          order = "modelName";
          break;
        case "type":
          order = "typeName";
          break;
        case "count":
          order = "modelCount";
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
      return historyRepository.findDevicesHistory(paging);
    }else{
      return historyRepository.findDevicesHistoryByContaining(search, paging);
    }

  }

  public Page<IHistoryDevice> getDeviceHistory(long id, int page, int pageSize) {
    Pageable paging;
    int pageNumber = page > 0 ? page : 1;
    paging = PageRequest.of(pageNumber-1, pageSize);
    return historyRepository.findDeviceHistory(paging, id);
  }
}
