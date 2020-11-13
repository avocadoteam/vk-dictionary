import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './Photo';

@Entity()
export class Dictionary {
  @PrimaryGeneratedColumn('increment', { type: 'int8' })
  id!: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  definition: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  name_plain_text!: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'ts_config_name'
  })
  TsConfigName!: string;

  @OneToMany(() => Photo, (photo) => photo.dictionary)
  photos!: Photo[];

  constructor(name: string, definition: string) {
    this.name = name;
    this.definition = definition;
  }
}
