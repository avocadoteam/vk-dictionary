import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dictionary } from './Dictionary';

@Entity({
  name: 'word_frequency',
})
export class WordFrequency {
  @PrimaryGeneratedColumn('increment', { type: 'int8' })
  id!: number;

  @Column({
    type: 'int4',
  })
  frequency: number;

  @OneToOne(() => Dictionary, (dict) => dict.wordFrequency)
  @JoinColumn({
    name: 'exp_dict_id',
  })
  expDict: Dictionary | string;

  constructor(frequency: number, expDict: string) {
    this.frequency = frequency;
    this.expDict = expDict;
  }
}
