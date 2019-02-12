import "reflect-metadata";
import { createConnection, Connection } from "typeorm"

import { PartnerRepository } from "./entity/Partner/PartnerRepository"
import { PurchaseOrderRepository } from "./entity/PurchaseOrder/PurchaseOrderRepository"

async function main(connection: Connection) {
    const userRepository = connection.getCustomRepository(PartnerRepository)
    const purchaseOrderRepository = connection.getCustomRepository(PurchaseOrderRepository)

    const partner = await userRepository
        .create('AwesomePartner')

    await purchaseOrderRepository
        .createPOsFromAmounts(partner, [10, 20, 30])

    const amount = await purchaseOrderRepository
        .sumAmountByPartnerId(partner.id)

    console.log('Sum PO amount: ', amount) // => Sum PO amount: 60
}

createConnection()
    .then(main)
    .catch(error => console.log(error))
