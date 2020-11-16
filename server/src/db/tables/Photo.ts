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
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({
    type: 'text',
  })
  splash_id: string;

  @Column({
    type: 'text',
  })
  url_regular: string;

  @Column({
    type: 'text',
  })
  url_full: string;

  @Column({
    type: 'text',
  })
  user_name: string;

  @Column({
    type: 'text',
  })
  user_link: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  color: string | null;

  @Column({
    type: 'text',
  })
  blur_hash: string;

  @ManyToOne(() => Dictionary, (d) => d.photos)
  @JoinColumn({
    name: 'dictionary_id',
  })
  @Index()
  dictionary: Dictionary | string;

  constructor(
    url_regular: string,
    dictionary: Dictionary | string,
    url_full: string,
    user_name: string,
    user_link: string,
    color: string | null,
    blur_hash: string,
    splash_id: string,
  ) {
    this.dictionary = dictionary;
    this.url_regular = url_regular;
    this.url_full = url_full;
    this.user_name = user_name;
    this.user_link = user_link;
    this.color = color;
    this.blur_hash = blur_hash;
    this.splash_id = splash_id;
  }
}
