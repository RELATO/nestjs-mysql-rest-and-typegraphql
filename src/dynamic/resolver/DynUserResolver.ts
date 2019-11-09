import { Resolver } from "type-graphql";
import { DynUser } from "../entity/dynuser.entity";
import { createBaseResolver } from "./BaseResolver";
import { DynUserArgs, DynUserFilterArgs } from "../arg/DynUserArgs";

const BaseDynUserResolver = createBaseResolver("DynUser", "DynUsers", DynUser, DynUserArgs, DynUserFilterArgs);

@Resolver(DynUser)
export class DynUserResolver extends BaseDynUserResolver {
}
