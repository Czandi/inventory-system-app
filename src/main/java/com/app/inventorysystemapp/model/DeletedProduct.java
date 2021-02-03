package com.app.inventorysystemapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeletedProduct {
  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private long id;
  @JoinColumn(name = "serial_number")
  private String serialNumber;
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
  @JoinColumn(name = "id_device_set", referencedColumnName = "id")
  private ProductSet productSet;
  private long barCode;
  private String comments;
  private LocalDateTime createdDate;
  @CreationTimestamp
  private LocalDateTime deletedDate;
}
