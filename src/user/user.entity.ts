import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
  OneToMany,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import * as argon2 from "argon2";

import { IdeaEntity } from "../idea/idea.entity";
import { CommentEntity } from "../comment/comment.entity";

@ObjectType()
@Entity("user")
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  created: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated: Date;

  @Field()
  @Column({
    length: 100,
    unique: true,
  })
  username: string;

  @Column({length: 100})
  password: string;

  @Field(() => [IdeaEntity])
  @OneToMany(() => IdeaEntity, idea => idea.author)
  ideas: IdeaEntity[];

  @Field(() => [IdeaEntity])
  @ManyToMany(() => IdeaEntity, { cascade: true })
  @JoinTable()
  bookmarks: IdeaEntity[];

  @Field(() => [CommentEntity])
  comments: CommentEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
