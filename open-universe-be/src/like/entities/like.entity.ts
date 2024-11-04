import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';

@Entity({ name: 'like' })
export class Like {
  @PrimaryColumn()
  post_id: number;

  @PrimaryColumn()
  user_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  followed_at: Date;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({name: "post_id"})
  post: Relation<Post>;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({name: "user_id"})
  user: Relation<User>;
}
