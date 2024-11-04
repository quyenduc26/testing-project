import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'authentication' })
export class Auth {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ nullable: true, type: 'varchar', length: 255, default: null })
  refresh_token: string;

  @OneToOne(() => User, (user) => user.auth, { nullable: false })
  user: Relation<User>;
}
