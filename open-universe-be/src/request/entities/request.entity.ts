import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'request' })
export class Request {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  follower_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  followed_at: Date;

  @Column({ type: 'tinyint', default: 0 })
  status: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'follower_id' })
  follower: User;
}
