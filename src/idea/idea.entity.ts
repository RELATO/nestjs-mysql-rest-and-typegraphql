import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";

import { UserEntity } from "../user/user.entity";
import { CommentEntity } from "../comment/comment.entity";

@ObjectType()
@Entity("idea")
export class IdeaEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  created: Date;

  @Field()
  @UpdateDateColumn()
  updated: Date;

  @Field()
  @Column()
  idea: string;

  @Field()
  @Column()
  description: string;

  @Field(() => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, author => author.ideas)
  author: UserEntity;

  @ManyToMany(() => UserEntity, { cascade: true })
  @JoinTable()
  upvotes: UserEntity[];

  @Field(() => Int)
  upvotesAmount: number;

  @ManyToMany(() => UserEntity, { cascade: true })
  @JoinTable()
  downvotes: UserEntity[];

  @Field(() => Int)
  downvotesAmount: number;

  @Field(() => [CommentEntity])
  @OneToMany(() => CommentEntity, comment => comment.idea, { cascade: true })
  comments: CommentEntity[];
}
