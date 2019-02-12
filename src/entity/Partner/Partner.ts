import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

import { PurchaseOrder } from "../PurchaseOrder/PurchaseOrder"

@Entity()
export class Partner {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: string   

    @OneToMany(_ => PurchaseOrder, purchaseOrder => purchaseOrder.partner)
    purchaseOrders: PurchaseOrder[]
}