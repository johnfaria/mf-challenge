import { ContactsMacapa } from '@src/entity/mysql/ContactsMacapa'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { IContact } from '../interfaces/IContact'

export const formatPhone = (
  el: IContact
): QueryDeepPartialEntity<ContactsMacapa> => {
  const part1 = el.cellphone.substring(0, 2)
  const part2 = el.cellphone.substring(2, 4)
  const part3 = el.cellphone.substring(4, 9)
  const part4 = el.cellphone.substring(9, 13)
  return { nome: el.name, celular: `+${part1} (${part2}) ${part3}-${part4}` }
}
