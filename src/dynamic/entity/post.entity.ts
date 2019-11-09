import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, Int, Args } from "type-graphql";
import { DynUser } from "./dynuser.entity";
import { Page } from "./page.entity";
import { DynUserFilterArgs } from "../arg/DynUserArgs";
import { PageFilterArgs } from "../arg/PageArgs";

@ObjectType()
@Entity()
export class Post {

    @Field(() => Int)
    @PrimaryGeneratedColumn({ type: "bigint" })
    public postId: number;

    @Field(() => Int)
    @Column({ type: "bigint" })
    public userId: string;

    @Field()
    @Column()
    public title: string;

    @Field()
    @Column()
    public tag: string;

    @Field(() => DynUser)
    @ManyToOne(() => DynUser, (user) => user.posts)
    @JoinColumn({ name: "userId", referencedColumnName: "userId" })
    public author(@Args() {}: DynUserFilterArgs): Promise<DynUser> { return; }

    @Field(() => [Page], { nullable: true })
    @OneToMany(() => Page, (page) => page.post)
    @JoinColumn({ name: "postId", referencedColumnName: "postId" })
    public pages(@Args() {}: PageFilterArgs): Promise<Page[]> { return; }
}
