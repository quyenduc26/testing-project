import { ActiveStatus } from 'src/constants';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from 'src/like/entities/like.entity';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  content: string;

  @Column()
  media_url: string;

  @Column({ type: 'enum', enum: ActiveStatus, default: ActiveStatus.ACTIVE })
  status: ActiveStatus;

  @Column({ type: Boolean, default: false })
  is_destroyed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Timestamp;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  user: Relation<User>;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Relation<Comment>[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Relation<Like>[];
}

export interface PostWithCommentCount extends Post {
  commentCount?: number;
}
