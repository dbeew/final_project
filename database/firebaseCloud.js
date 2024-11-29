// Cloud Firestore

import { Firestore, getFirestore } from 'firebase/firestore';
import app from '../database/firebaseAuth';

const db = getFirestore(app);

export default db;