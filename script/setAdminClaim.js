// scripts/setAdminClaim.js
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccountKey.json";

initializeApp({ credential: cert(serviceAccount) });

async function setAdmin(uid) {
  await getAuth().setCustomUserClaims(uid, { admin: true });
  console.log("Admin 권한 부여 완료:", uid);
}

const uid = process.argv[2];
if (!uid) throw new Error("사용자 UID를 인자로 넘겨주세요");
setAdmin(uid);
