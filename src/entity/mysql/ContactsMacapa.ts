import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('id', ['id'], { unique: true })
@Entity('contacts_macapa', { schema: 'admin' })
export class ContactsMacapa {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string

  @Column('varchar', { name: 'nome', length: 200 })
  nome: string

  @Column('varchar', { name: 'celular', length: 20 })
  celular: string
}
