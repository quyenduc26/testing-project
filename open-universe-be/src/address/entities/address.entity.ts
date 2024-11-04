import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsBoolean } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  street: string;

  @Column({ type: 'varchar', nullable: true })
  state: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  country: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  @IsBoolean({ message: 'Is default must be a boolean' })
  is_default: boolean;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @ManyToOne(() => User, (user) => user.address)
  user: Relation<User>;
}
