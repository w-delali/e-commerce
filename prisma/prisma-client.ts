import {PrismaClient} from "@prisma/client";
import {Prisma} from "prisma/prisma-client/scripts/default-index";
import {hashPassword} from "../src/utils/auth-utils";

const prismaClient = new PrismaClient(
    {log: ["query"]}
).$extends({
    query:{
        user:{
            create:async ({args,query})=>{
                const newArgs= args
                newArgs.data.password=await hashPassword(newArgs.data.password)
            return query(newArgs)
            }
        }
    }
})

const hashPasswordExt =Prisma.defineExtension({
    query:{
        user:{

        }
    }
})



export  {prismaClient}