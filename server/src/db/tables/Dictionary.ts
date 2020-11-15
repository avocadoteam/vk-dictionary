import { languageConfig } from 'src/contracts/search';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from './Photo';
import { WordFrequency } from './WordFrequency';

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
  })
  definition_plain_text: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'ts_config_name',
  })
  TsConfigName: string;

  @OneToMany(() => Photo, (photo) => photo.dictionary)
  photos!: Photo[];

  @OneToOne(() => WordFrequency, (frq) => frq.expDict)
  wordFrequency!: WordFrequency;

  constructor(name: string, definition: string, definition_plain_text: string) {
    this.name = name;
    this.definition = definition;
    this.TsConfigName = languageConfig;
    this.definition_plain_text = definition_plain_text;
  }
}
