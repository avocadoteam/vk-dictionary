import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Dictionary } from './Dictionary';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
  })
  url: string;

  @ManyToOne(() => Dictionary, (d) => d.photos)
  @JoinColumn({
    name: 'dictionary_id',
  })
  @Index()
  dictionary: Dictionary;

  constructor(url: string, dictionary: Dictionary) {
    this.dictionary = dictionary;
    this.url = url;
  }
}
