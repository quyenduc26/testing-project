import { ActiveStatus, Gender, UserRole } from 'src/constants';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Address } from 'src/address/entities/address.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { Like } from 'src/like/entities/like.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  full_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  user_name: string;

  @Column({ nullable: true, type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 12, nullable: true, unique: true })
  phone_number: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Column({ type: 'enum', enum: ActiveStatus, default: ActiveStatus.ACTIVE })
  status: ActiveStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cover: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  instagram: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  facebook: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Timestamp;

  @OneToMany(() => Post, (post) => post.user_id)
  posts: Relation<Post>[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Relation<Comment>[];

  @OneToMany(() => Address, (address) => address.user)
  address: Relation<Address>[];

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Relation<Auth>;

  @OneToMany(() => Like, (like) => like.user)
  likes: Relation<Like>[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUNDS));
  }
}
