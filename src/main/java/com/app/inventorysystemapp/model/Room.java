package com.app.inventorysystemapp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Setter
@Getter
public class Room {
  @Id
  private int id;
  private String name;
}
