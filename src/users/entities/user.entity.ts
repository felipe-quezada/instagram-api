import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ length: 500 })
    fullName: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    phoneNumber: string;
    
    @Column({ nullable: false })
    userName: string;
    
    @Column({ default: 'user' })
    role: string;

    @Column({ nullable: false })
    password: string;

    @UpdateDateColumn()
    updatedAt: Date;
}
