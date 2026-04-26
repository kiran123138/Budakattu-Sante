import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  addDoc, 
  serverTimestamp,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/error-handler';
import { Artisan, Product, Order } from '../types';

export const storeService = {
  async getArtisans(): Promise<Artisan[]> {
    try {
      const snap = await getDocs(collection(db, 'artisans'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Artisan));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'artisans');
      return [];
    }
  },

  async getProducts(): Promise<Product[]> {
    try {
      const snap = await getDocs(collection(db, 'products'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'products');
      return [];
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const d = await getDoc(doc(db, 'products', id));
      return d.exists() ? ({ id: d.id, ...d.data() } as Product) : null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `products/${id}`);
      return null;
    }
  },

  async getArtisanById(id: string): Promise<Artisan | null> {
    try {
      const d = await getDoc(doc(db, 'artisans', id));
      return d.exists() ? ({ id: d.id, ...d.data() } as Artisan) : null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `artisans/${id}`);
      return null;
    }
  },

  async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...order,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'orders');
      return null;
    }
  }
};
