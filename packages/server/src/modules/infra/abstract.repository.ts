import firebaseAdmin, { firestore } from 'firebase-admin';
import CollectionReference = firestore.CollectionReference;

export abstract class AbstractRepository {
  protected readonly collection: CollectionReference;

  protected constructor(collection: string) {
    this.collection = firebaseAdmin
      .initializeApp(
        {
          credential: firebaseAdmin.credential.cert({
            projectId: 'playground-cdeda',
            privateKey:
              '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7EMTOagrwYoKT\nhw1EXDdf9aDnOGI55AYwbzID6AWFndXAxSNsErfvmy+rrwSclad+zWZ6ZRxdEl61\nbuOGI+dLP4cwRJFaBokv+BIluGwzKTYWjd3U5x+Ew8M7BFWezIew69MMXAKvn7Vv\noQoca7wjWlhNWfL1eiF2qcAWtzi8SZFgbMFjeNzyCzCMb/qBTPRMXxoDTQW9iymb\nUFJH3qvXzCNylsjwRfECB0r0ZIld2rKOiFfFXG76OQbVeRhU3omzNxIap+DK4MXB\niBoLjcQUKRVBlz2zvntwKKtAInVAJHMWxQXTZ5GCp4cf4XnJhfb1Ba5nvcREqTgR\n6TjzaHw/AgMBAAECggEANIRlrEmLHqeZXw+YQuvcw/zymldzBCunLSvaj8ww2K1S\nGFeANVQf/Y3E2V8+XTOKnYfO0GfYiayhmDA0gjFMOwzvyDZH1E1ncGcluR9IiSh1\nvelAMQheCejnw4bY/scPBTV/v8WJH4Mn7dn5O7dnT0mK5tRs6EvMX0MS4Y24yOsm\n7tSiqGEoli/5zAx6XzzhG8kfWU9uITSjM/UNhr6IFZ5Bp4yrNrISVwoKv3Iz/1VZ\nMo8jRKsAO/PBxwDq1nj7d8Qk+NEFxze3MqUm30jyPpWEkCny11KAskTsTNHtezBK\neSRSc4lYcVKRfWeyGLjBUrIRIqz/wEc4bc2kRA5o0QKBgQDzEDF3YhmZPBIz50B6\nWvryLkjw+ygSZFVmkZ8iP70Y7Tf8DS1SkojUSYAsz8arqarzNYRnWhVyGevMU2Ob\nV1tV5OPepWcnXS4yD9fm7MnIsge3IZsvZRdCDRVQvc/8t85/0KxWhtcZGnOq8zCa\nZnOyR+RazDhbMAIIOLr6iNNTiQKBgQDFBZcOxivlLPgxq5+yE4wQ1D4pG/l93Ywi\nD5L5WnVSzKjIxWYVqQIm53e314x+1QStRmThBOjj36z5IWpEaU4izooC1//HxTHQ\nFsDVWVhdgo2EgO3HvyCp3o1M0kumHNAlXxMVSgjsIfq/G+iFVMGRTqZqGIVVwCQb\n7GiVWp03hwKBgDNXQUuZQhT29lVWTG1L2GPdWPTl6DHyVYOj0Lw4QGYKfV/VHLSr\nVRGaMOPGQ42w+fYDYOM/yPXf+cmf95MxYY6EGYnG4EIVUZOrewxBCeJFkJGjHJdn\nQAFoqA70+QDFhm3DExP3yWl5B+OdGLAUYe3Pd7GiH2lLe7Jm4T/YNOMZAoGAfcFW\nrNhy1iIA/XtFQF3Xrjo6vvSbJ+qMcoUsU7qYXlRBe3z77uFkfT6LHK4ZgC8pgAwJ\ngdMnb6OqfY4FjUsF05OvZadHHNTSObb8OHGBxJX7DFNa8n8dMy/ZUup73LhRZzkr\nLhCGZ2o86VS/8rKpprzj3Z5vJM+yfJxGGOawqOsCgYBGFeHXKzoj0di94I2D2wYc\nkEVJ7u9NUxR1ARhlyNXzy8a3iKaW9GysAonqEKV8k5bgL3CnMVUZe/N4o/EL4cb0\nt/26Ve+y7uzJg4heXTnvecJ1r9NZzPPS6/Vkenrqs6nKfcnPQBV+CNFSWlqkkV4h\n681/zHncYc9+s/2ksXSVnQ==\n-----END PRIVATE KEY-----\n',
            clientEmail:
              'firebase-adminsdk-81wcb@playground-cdeda.iam.gserviceaccount.com',
          }),
          // databaseURL: 'https://playground-cdeda.firebaseio.com',
        },
        collection
      )
      .firestore()
      .collection(collection);
  }
}
