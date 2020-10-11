package com.app.inventorysystemapp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Owner {
  @Id
  private int id;
  private String name;
  private String surname;
}
