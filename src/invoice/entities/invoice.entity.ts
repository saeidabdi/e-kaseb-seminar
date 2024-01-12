import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: "text" })
  fist_name: string;
  @Column({ nullable: true, type: "text" })
  last_name: string;
  @Column({ nullable: true, type: "text" })
  notional_code: string;
  @Column({ nullable: true, type: "text" })
  mobile: string;
  @Column({ nullable: true, type: "text" })
  father_name: string;
  @Column({ nullable: true, type: "text" })
  birth_day: string;
  @Column({ nullable: true, type: "text" })
  shop_id: string;
  @Column({ nullable: true, type: "integer" })
  amount: string;
  @Column({ nullable: true, type: "integer" })
  file: string;
  @Column({ nullable: true, type: "text" })
  floor: string;
  @Column({ nullable: true, type: "integer" })
  creator: string;
  @Column({ nullable: true, type: "bigint" })
  timeadded: string;

}

