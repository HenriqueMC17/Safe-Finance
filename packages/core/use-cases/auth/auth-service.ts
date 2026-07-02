import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret_for_dev_only_change_in_prod"
);

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL || "";
const convex = new ConvexHttpClient(CONVEX_URL);

export interface SessionPayload {
  userId: string;
  email: string;
  expiresAt: Date;
}

export class AuthService {
  private static SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  static async encrypt(payload: SessionPayload) {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);
  }

  static async decrypt(session: string | undefined = "") {
    try {
      const { payload } = await jwtVerify(session, JWT_SECRET, {
        algorithms: ["HS256"],
      });
      return payload as unknown as SessionPayload;
    } catch (error) {
      return null;
    }
  }

  static async createSession(userId: string, email: string) {
    const expiresAt = new Date(Date.now() + this.SESSION_DURATION);
    const session = await this.encrypt({ userId, email, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  }

  static async deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  }

  static async getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    return this.decrypt(session);
  }

  static async login(email: string, password: string) {
    const user = await convex.query(api.users.getUserByEmail, { email });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    await this.createSession(user._id, user.email);

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }
}
