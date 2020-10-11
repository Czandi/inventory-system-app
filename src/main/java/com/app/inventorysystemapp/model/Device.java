package com.app.inventorysystemapp.model;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Device {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String serial_number;

  private int inventory_number;

  @ManyToOne
  @JoinColumn(name = "id_room")
  private Room room;

  @ManyToOne
  @JoinColumn(name = "id_model")
  private Model model;

  @ManyToOne
  @JoinColumn(name = "id_owner")
  private Owner owner;

  @ManyToOne
  @JoinColumn(name = "id_type")
  private Type type;

  @ManyToOne
  @JoinColumn(name = "id_devices_set", referencedColumnName = "id")
  private DevicesSet devicesSet;

  private long bar_code;

  private String comments;

  private LocalDateTime created_date;
}
