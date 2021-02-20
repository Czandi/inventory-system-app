package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.History;
import com.app.inventorysystemapp.model.interfaces.IHistoryProduct;
import com.app.inventorysystemapp.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class HistoryService implements com.app.inventorysystemapp.service.Service {

  private final HistoryRepository historyRepository;

  public HistoryService(HistoryRepository historyRepository) {
    this.historyRepository = historyRepository;
  }

  public Page<History> getHistory(int page,
                                  int pageSize,
                                  String orderBy,
                                  String sortType,
                                  String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    if (search == null) {
      return historyRepository.findAll(paging);
    } else {
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
    history.setDate(LocalDateTime.now());

    return historyRepository.save(history);
  }


  public Page<IHistoryProduct> getDevicesHistory(int page, int pageSize, String orderBy, String sortType, String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    if (search == null) {
      return historyRepository.findDevicesHistory(paging);
    } else {
      return historyRepository.findDevicesHistoryByContaining(search, paging);
    }

  }

  public Page<IHistoryProduct> getDeviceHistory(long id, int page, int pageSize) {
    Pageable paging;
    int pageNumber = page > 0 ? page : 1;
    paging = PageRequest.of(pageNumber - 1, pageSize);
    return historyRepository.findDeviceHistory(paging, id);
  }

  @Override
  public String generateOrderValue(String orderBy) {
    switch (orderBy) {
      case "name":
        return "modelName";
      case "type":
        return "typeName";
      case "count":
        return "modelCount";
      default:
        return orderBy;
    }
  }
}
