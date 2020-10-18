package com.app.inventorysystemapp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "type")
public class DeviceType {
  @Id
  private long id;
  private String name;
}
