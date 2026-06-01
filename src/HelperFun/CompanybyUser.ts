import prismaclient from "@/services/prisma";
import { cookies } from "next/headers";

export  async function CompanybyUser(userId:string) {
    const userCookies=await cookies();
    const token=userCookies.get("token")?.value;
    if(!token){
       return null;
    }
    const user = await prismaclient.user.findUnique({
        where: { id: userId },
    });
    if (!user) return null;

    let company = null;
    if (user.companyId) {
        company = await prismaclient.company.findUnique({
            where: { id: user.companyId },
        });
    } else {
        company = await prismaclient.company.findUnique({
            where: { ownerId: userId },
        });
    }
    return company;
}