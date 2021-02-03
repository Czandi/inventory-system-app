package com.app.inventorysystemapp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Model {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private long id;
  private String name;
  @ManyToOne
  @JoinColumn(name = "id_type")
  private ProductType type;

  public Model() {}

  public Model(String name, ProductType type){
    this.type = type;
    this.name = name;
  }
}
