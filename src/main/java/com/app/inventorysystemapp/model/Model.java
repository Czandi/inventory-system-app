package com.app.inventorysystemapp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Setter
@Getter
public class Model {
  @Id
  private int id;
  private String name;
  @ManyToOne
  @JoinColumn(name = "id_type")
  private Type type;
}
