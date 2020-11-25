import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('id', ['id'], { unique: true })
@Entity('contacts_amapa', { schema: 'admin' })
export class ContactsAmapa {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string

  @Column('varchar', { name: 'nome', length: 200 })
  nome: string

  @Column('varchar', { name: 'celular', length: 20 })
  celular: string
}
