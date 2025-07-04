// scripts/setAdminClaim.js

// 1) .env.local 의 FIREBASE_* 변수를 process.env에 로드
require("dotenv").config({ path: `${__dirname}/../.env.local` });

const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

// 2) Admin SDK 초기화 (한 번만)
if (!admin.apps.length) {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    console.error("❌ Admin SDK 환경 변수가 설정되지 않았습니다.");
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      // "\n" 이스케이프를 실제 개행 문자로 치환
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// 3) UID 받아서 admin 커스텀 클레임 부여
async function setAdmin(uid) {
  const auth = getAuth();
  await auth.setCustomUserClaims(uid, { admin: true });
  console.log(`✅ Admin 권한 부여 완료: ${uid}`);
  process.exit(0);
}

// 4) 커맨드라인 인자 처리
const uid = process.argv[2];
if (!uid) {
  console.error("Usage: node scripts/setAdminClaim.js <관리자_UID>");
  process.exit(1);
}

// 5) 실행
setAdmin(uid).catch((err) => {
  console.error("❌ 오류 발생:", err);
  process.exit(1);
});
