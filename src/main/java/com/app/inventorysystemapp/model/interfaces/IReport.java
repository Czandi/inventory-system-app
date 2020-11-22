package com.app.inventorysystemapp.model.interfaces;

import com.app.inventorysystemapp.model.Device;

import java.time.LocalDate;
import java.util.List;

public interface IReport {

  LocalDate getDate();
  String getRoom();
  List<Device> getMissingRecords();
  List<Device> actualStock();
  List<Device> previousStock();

}
