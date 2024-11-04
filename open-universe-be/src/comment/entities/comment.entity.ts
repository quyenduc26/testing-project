import { ActiveStatus } from 'src/constants';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  post_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  media_url: string;

  @Column({ type: 'enum', enum: ActiveStatus, default: ActiveStatus.ACTIVE })
  status: ActiveStatus;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Timestamp;

  @ManyToOne(() => User, (user) => user.posts)
  user: Relation<User>;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Relation<Post>;
}
