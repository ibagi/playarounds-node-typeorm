import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

import { Partner } from "../Partner/Partner"

@Entity()
export class PurchaseOrder {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @ManyToOne(_ => Partner, partner => partner.purchaseOrders)
    partner: Partner
}
