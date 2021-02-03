package com.app.inventorysystemapp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "type")
public class ProductType {
  @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
  private long id;
  private String name;
}
