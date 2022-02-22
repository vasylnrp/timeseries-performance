import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('vehicleEvents')
@Index(['vehicleId', 'measureName', 'createDateTime'])
export class VehicleEvent extends BaseEntity {
  @Index()
  @Column({ type: 'varchar', length: 50 })
  vehicleId: string;

  @Column({ type: 'varchar', length: 40 })
  measureName: string;

  @Column({ type: 'varchar', length: 40 })
  measureValue: string;
}
