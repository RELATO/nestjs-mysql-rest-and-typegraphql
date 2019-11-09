import { ArgsType, Field, Int } from "type-graphql";
import { DynUser } from "../entity/dynuser.entity";
import { BaseFilterArgs } from "./BaseFilterArgs";

/**
 * Arg fields needed to identify ONE instance of User
 */
@ArgsType()
export class DynUserArgs implements Partial<DynUser> {

    @Field(() => Int)
    public userId: number;
}

/**
 * Unnecessary (nullable) arg fields to filter users as you want
 */
@ArgsType()
export class DynUserFilterArgs extends BaseFilterArgs implements Partial<DynUser> {

    @Field(() => Int, { nullable: true })
    public userId?: number;

    @Field({ nullable: true })
    public firstName: string;

    @Field({ nullable: true })
    public lastName: string;
}
