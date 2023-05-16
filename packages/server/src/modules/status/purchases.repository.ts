import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { AbstractRepository } from '~/modules/infra/abstract.repository';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

@Injectable()
export class PurchasesRepository extends AbstractRepository {
  constructor() {
    super('purchases');
  }

  async getProductNames() {
    const res: Set<string> = new Set<string>();
    const data = (await this.collection.select('productId').get()).docs;
    data.map(i => {
      const product = i.get('productId');
      if (product) {
        res.add(product);
      }
    });
    return Array.from(res);
  }

  async countByDateAndProductId(date: Date) {
    const startDate = firestore.Timestamp.fromDate(date);
    const endDate = firestore.Timestamp.fromDate(
      new Date(date.getTime() + 3600 * 24 * 1000)
    );
    const data = await this.collection
      .where('purchaseDate', '>=', startDate)
      .where('purchaseDate', '<', endDate)
      .count()
      .get();

    return data.data().count;
  }

  async countAttributedByDateAndDownloads(date: Date, downloads: QueryDocumentSnapshot[]) {
    let count = 0;
    const ids = downloads.map(i => i.id);

    for (let i = 0; i < ids.length; i += 30) {
      const startDate = firestore.Timestamp.fromDate(date);
      const countPlus = await this.collection
        .where('purchaseDate', '>=', startDate)
        .where('userId', 'in', ids.slice(i, Math.min(ids.length, i + 30)))
        .where('type', '==', 'SUBSCRIPTION')
        .count()
        .get();

      const countMinus = await this.collection
        .where('purchaseDate', '>=', startDate)
        .where('userId', 'in', ids.slice(i, Math.min(ids.length, i + 30)))
        .where('type', '==', 'NON_SUBSCRIPTION')
        .count()
        .get();

      count += countPlus.data().count - countMinus.data().count;
    }
    return count;
  }
}
