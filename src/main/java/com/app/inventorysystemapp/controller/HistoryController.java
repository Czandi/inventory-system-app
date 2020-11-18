package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.HistoryDeviceDto;
import com.app.inventorysystemapp.controller.mapper.HistoryMapper;
import com.app.inventorysystemapp.model.History;
import com.app.inventorysystemapp.service.HistoryService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class HistoryController {

  private final HistoryService historyService;

  public HistoryController(HistoryService historyService) {
    this.historyService = historyService;
  }

  @GetMapping("/history")
  public Page<History> getHistory(int page,
                                  int pageSize,
                                  @RequestParam(required = false) String orderBy,
                                  @RequestParam(required = false) String sortType,
                                  @RequestParam(required = false) String search) {
    return historyService.getHistory(page, pageSize, orderBy, sortType, search);
  }

  @GetMapping("/history/devices")
  public Page<HistoryDeviceDto> getDevicesHistory(int page,
                                                  int pageSize,
                                                  @RequestParam(required = false) String orderBy,
                                                  @RequestParam(required = false) String sortType,
                                                  @RequestParam(required = false) String search) {
    return HistoryMapper.mapToHistoryDeviceDtos(historyService.getDevicesHistory(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/history/devices/{id}")
  public Page<HistoryDeviceDto> getDeviceHistory(@PathVariable(value = "id") Long id,
                                                 int page,
                                                 int pageSize){
    return HistoryMapper.mapToHistoryDeviceDtos(historyService.getDeviceHistory(id, page, pageSize));
  }

  @PostMapping("/history")
  public History insertHistory(String tableName, long idRecord, String changedAttribute, String oldValue, String newValue) {
    return historyService.insertHistory(tableName, idRecord, changedAttribute, oldValue, newValue);
  }


}
