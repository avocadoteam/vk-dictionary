import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Dictionary } from './Dictionary';

@Entity({
  name: 'user_favourite',
})
export class UserFavourite {
  @PrimaryColumn({ type: 'int8', name: 'vk_id' })
  vk_id: string;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  deleted: Date | null;

  @ManyToOne(() => Dictionary, (d) => d.favourites)
  @JoinColumn({
    name: 'dictionary_id',
  })
  @Index()
  expDict: Dictionary | string;

  constructor(expDict: string, vkUserId: string, deleted: Date | null) {
    this.expDict = expDict;
    this.vk_id = vkUserId;
    this.deleted = deleted;
  }
}
