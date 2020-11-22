package com.app.inventorysystemapp.model;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class Report {
  private LocalDate date;
  private String room;
  private List<Device> missingRecords;
  private List<Device> actualStock;
  private List<Device> previousStock;
}
