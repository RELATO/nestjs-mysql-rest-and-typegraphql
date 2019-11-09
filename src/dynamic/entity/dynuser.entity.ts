import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { ObjectType, Field, Int, Args } from "type-graphql";
import { Post } from "./post.entity";
import { PostFilterArgs } from "../arg/PostArgs";

@ObjectType()
@Entity()
export class DynUser {

    @Field(() => Int)
    @PrimaryGeneratedColumn({ type: "bigint" })
    public userId: number;

    @Field()
    @Column()
    public firstName: string;

    @Field()
    @Column()
    public lastName: string;

    @Field(() => [Post], { nullable: true })
    @OneToMany(() => Post, (post) => post.author)
    @JoinColumn({ name: "userId", referencedColumnName: "userId" })
    public posts(@Args() {}: PostFilterArgs): Promise<Post[]> { return; }
}
