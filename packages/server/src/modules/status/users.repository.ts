import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import firebase from 'firebase/compat';
import { AbstractRepository } from '~/modules/infra/abstract.repository';
import Timestamp = firebase.firestore.Timestamp;

@Injectable()
export class UsersRepository extends AbstractRepository {
  constructor() {
    super('users');
  }

  async get(id: string) {
    const data = await this.collection.doc(id).get();
    return data;
  }

  async getDates(offset = 0, size = Number.POSITIVE_INFINITY) {
    const res = new Set<string>();
    const data = await this.collection
      .select('createdAt')
      .orderBy('createdAt')
      .get();

    data.docs.map(i => {
      const createdAt: Timestamp = i.get('createdAt');

      if (createdAt) {
        const date = new Date(createdAt.toDate().toDateString());
        res.add(date.toLocaleDateString('en-US'));
      }
    });

    const list = Array.from(res);

    return list.slice(
      Math.min(list.length, offset),
      Math.min(list.length, offset + size * 1.0)
    );
  }

  async countByCreatedAt(date: Date) {
    const startDate = firestore.Timestamp.fromDate(date);
    const endDate = firestore.Timestamp.fromDate(
      new Date(date.getTime() + 3600 * 24 * 1000)
    );
    const data = await this.collection
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<', endDate)
      .count()
      .get();

    return data.data().count;
  }

  async getByCreatedAt(date: Date) {
    const startDate = firestore.Timestamp.fromDate(date);
    const endDate = firestore.Timestamp.fromDate(
      new Date(date.getTime() + 3600 * 24 * 1000)
    );
    const data = await this.collection
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<', endDate)
      .get();

    return data.docs;
  }
}
