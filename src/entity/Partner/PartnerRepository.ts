import { EntityRepository, EntityManager } from "typeorm"
import { Partner } from "./Partner"

@EntityRepository()
export class PartnerRepository {
    constructor(private readonly manager: EntityManager) {
    }

    async create(name: string, address: string = 'UNKNOWN'): Promise<Partner> {
        const partner  = new Partner()
        partner.address = address
        partner.name = name
        
        await this.manager.save(partner)
        return partner
    }

    async getByName(name: string): Promise<Partner> {
        return await this.manager.findOne(Partner, {
            where: {
                name
            }
        })
    }
}