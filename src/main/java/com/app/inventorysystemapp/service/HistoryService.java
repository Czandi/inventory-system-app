package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.History;
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

    history.setTable_name(tableName);
    history.setId_record(idRecord);
    history.setChanged_attribute(changedAttribute);
    history.setOld_value(oldValue);
    history.setNew_value(newValue);

    return historyRepository.save(history);
  }


}
