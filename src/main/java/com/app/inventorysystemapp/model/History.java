package com.app.inventorysystemapp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class History {
  @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
  private long id;
  private String table_name;
  private long id_record;
  private String changed_attribute;
  private String old_value;
  private String new_value;
  private LocalDateTime date;
}
