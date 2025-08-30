// src/app/api/me/route.ts
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

type Plan = "free" | "pro" | "agency";

export async function GET() {
  try {
    let userId: string | null = null;

    // Try to read auth; if middleware isn't detected in preview, fall back gracefully
    try {
      const a = auth();
      userId = a?.userId ?? null;
    } catch {
      // Middleware not detected (e.g., Bolt preview). Fall through as signed-out.
      userId = null;
    }

    // Signed-out → return free defaults so UI never breaks
    if (!userId) {
      return NextResponse.json({
        userId: null,
        email: null,
        plan: "free" as Plan,
        limits: { gensPerDay: 3, pdf: false },
      });
    }

    const user = await currentUser();
    const email =
      user?.primaryEmailAddress?.emailAddress ??
      user?.emailAddresses?.[0]?.emailAddress ??
      null;

    const plan = ((user?.privateMetadata as any)?.plan as Plan) || "free";

    const limits =
      plan === "pro" || plan === "agency"
        ? { gensPerDay: 9999, pdf: true }
        : { gensPerDay: 3, pdf: false };

    return NextResponse.json({ userId, email, plan, limits });
  } catch (error: any) {
    return NextResponse.json(
      { error: "internal_error", details: error.message },
      { status: 500 }
    );
  }
}
