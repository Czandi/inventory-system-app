package com.app.inventorysystemapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InventoryItem {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  @ManyToOne
  @JoinColumn(name = "id_inventory")
  private Inventory inventory;
  @JoinColumn(name = "inventory_number")
  private String inventoryNumber;
  private String model;
  private String type;
  @JoinColumn(name = "stock_type")
  private String stockType;
}
