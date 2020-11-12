package com.app.inventorysystemapp.model.interfaces;

import java.time.LocalDateTime;

public interface IHistoryDevice {
  String getSerialNumber();
  long getBarCode();
  String getChangedAttribute();
  String getOldValue();
  String getNewValue();
  LocalDateTime getDate();
}
