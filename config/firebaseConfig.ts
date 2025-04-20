import {
  initializeApp,
  cert,
  ServiceAccount,
  AppOptions,
  App,
  getApps,
} from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const getFirebaseConfig = (): AppOptions => {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      "Missing Firebase configuration. Please check your environment variables."
    );
  }

  const serviceAccount: ServiceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };

  return { credential: cert(serviceAccount) };
};

const initializeFirebaseAdmin = (): App => {
  const existingApp: App = getApps()[0];

  if (existingApp) {
    return existingApp;
  }

  return initializeApp(getFirebaseConfig());
};

const app: App = initializeFirebaseAdmin();

const auth: Auth = getAuth(app);

const db: Firestore = getFirestore(app);

export { auth, db };
