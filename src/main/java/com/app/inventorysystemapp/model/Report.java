package com.app.inventorysystemapp.model;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class Report {
  private LocalDate date;
  private String recordName;
  private List<Product> missingRecords;
  private List<Product> additionalRecords;
  private List<Product> actualStock;
  private List<Product> previousStock;
}
