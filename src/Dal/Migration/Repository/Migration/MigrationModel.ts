
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("migration")
export class MigrationModel
{
  @PrimaryGeneratedColumn()
  public id: number = null;
  
  @Column()
  public group: string = null;
  
  @Column()
  public name: string = null;
  
  @Column()
  public executed: string = null;
  
  @Column()
  public batch: number = null;
  
  @Column()
  public created: string = null;
  
  @Column()
  public updated: string = null;
}
