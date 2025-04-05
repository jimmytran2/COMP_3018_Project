import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../comp-3018-project-507fb-firebase-adminsdk-fbsvc-6cea0ede6e.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

export default db;
