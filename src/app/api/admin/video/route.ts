// src/app/api/admin/homevideo/route.ts
import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const bucket = admin.storage().bucket();
  const file = bucket.file("home/home.mp4");

  try {
    const [metadata] = await file.getMetadata();
    const url = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent("home/home.mp4")}?alt=media`;
    return NextResponse.json({
      videoUrl: url,
      updated: metadata.updated,
    });
  } catch (e) {
    console.error("GET /api/admin/homevideo 오류", e);
    return NextResponse.json({ videoUrl: null }, { status: 200 });
  }
}
