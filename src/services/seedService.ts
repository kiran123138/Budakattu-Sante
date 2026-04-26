import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  limit 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const SAMPLE_ARTISANS = [
  {
    name: "Lakshmi Hegde",
    tribe: "Lambani",
    story: "Lakshmi is a master of Lambani embroidery, a craft passed down through generations in her nomadic tribe. Her work uses mirrors and geometric patterns to tell stories of migration and celebration.",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    location: "Bellary, Karnataka",
    rating: 4.8,
    joinedAt: new Date().toISOString()
  },
  {
    name: "Madhav Gond",
    tribe: "Gond",
    story: "Madhav specializes in Gond Art, using vibrant dots and lines to depict the interconnectedness of nature. His tribe believes that seeing a good image brings good luck.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    location: "Dindori, Madhya Pradesh",
    rating: 4.9,
    joinedAt: new Date().toISOString()
  }
];

const SAMPLE_PRODUCTS = (artisanIds: string[]) => [
  {
    name: "Hand-Embroidered Lambani Tote",
    description: "Multi-colored cotton tote with traditional mirror work and heavy embroidery.",
    price: 1250,
    category: "Textiles",
    artisanId: artisanIds[0],
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"],
    stock: 12,
    impactScore: "Directly funds Lakshmi's daughter's vocational training."
  },
  {
    name: "Tribal Flora Gond Painting",
    description: "Original A3 painting on handmade paper using natural pigments.",
    price: 3500,
    category: "Art",
    artisanId: artisanIds[1],
    images: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80"],
    stock: 5,
    impactScore: "Provides clean drinking water filters for Madhav's community."
  }
];

export async function seedDatabase() {
  const existing = await getDocs(query(collection(db, 'artisans'), limit(1)));
  if (!existing.empty) return; // Already seeded

  const artisanIds: string[] = [];
  for (const a of SAMPLE_ARTISANS) {
    const docRef = await addDoc(collection(db, 'artisans'), a);
    artisanIds.push(docRef.id);
  }

  const products = SAMPLE_PRODUCTS(artisanIds);
  for (const p of products) {
    await addDoc(collection(db, 'products'), p);
  }
}
