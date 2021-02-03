package com.app.inventorysystemapp.model.interfaces;

import com.app.inventorysystemapp.model.Product;

import java.time.LocalDate;
import java.util.List;

public interface IReport {

  LocalDate getDate();
  String getRoom();
  List<Product> getMissingRecords();
  List<Product> actualStock();
  List<Product> previousStock();

}
