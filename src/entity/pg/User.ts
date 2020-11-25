import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm'
import { IsEmail, IsString, Length, IsLowercase } from 'class-validator'
import bcrypt from 'bcryptjs'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  @IsEmail()
  @IsLowercase()
  @Length(4, 100)
  email: string

  @Column({ select: false })
  @Length(8, 100)
  @IsString()
  password: string

  @Column()
  @UpdateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }

  async validatePassword(unencryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(unencryptedPassword, this.password)
  }
}
