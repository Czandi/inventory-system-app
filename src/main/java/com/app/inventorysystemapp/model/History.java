package com.app.inventorysystemapp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class History {
  @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
  private long id;
  @JoinColumn(name = "table_name")
  private String tableName;
  @JoinColumn(name = "id_record")
  private long idRecord;
  @JoinColumn(name = "changed_attribute")
  private String changedAttribute;
  @JoinColumn(name = "old_value")
  private String oldValue;
  @JoinColumn(name = "new_value")
  private String newValue;
  private LocalDateTime date;
}
