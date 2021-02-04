package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
public class HistoryProductDto {
  private String serialNumber;

  private long barCode;

  private String changedAttribute;

  private String oldValue;

  private String newValue;

  private LocalDateTime date;
}
