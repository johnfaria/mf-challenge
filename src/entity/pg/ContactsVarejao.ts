import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('contacts_varejao')
export class ContactsVarejao {
  @PrimaryGeneratedColumn()
  id: number

  @Column('character varying', { name: 'nome', length: 100 })
  nome: string

  @Column('character varying', { name: 'celular', length: 13 })
  celular: string
}
