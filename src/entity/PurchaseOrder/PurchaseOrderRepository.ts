import { EntityRepository, EntityManager } from "typeorm"
import { PurchaseOrder } from "./PurchaseOrder"
import { Partner } from "../Partner/Partner"

@EntityRepository()
export class PurchaseOrderRepository {
    constructor(private readonly manager: EntityManager) {
    }

    async createPOs(partner: Partner, amounts: number[]): Promise<PurchaseOrder[]> {
        const pos = amounts.map(amount => {
            const po = new PurchaseOrder()
            po.amount = amount
            po.partner = partner
            return po
        })

        await this.manager.save(pos)
        return pos
    }

    async sumAmountByPartner(partner: Partner): Promise<number> {
        const result = await this.manager
            .createQueryBuilder(PurchaseOrder, 'po')
            .select('SUM(po.amount)', 'sum')
            .where('po.partner.id = :partnerId', { partnerId: partner.id })
            .getRawOne()

        return (result.sum || 0) as number
    }
}