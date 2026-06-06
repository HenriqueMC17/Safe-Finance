import { AuthService } from "@/features/auth/services/auth-service";

export async function getCurrentUser() {
  const session = await AuthService.getSession();
  
  if (!session) return null;

  return {
    id: session.userId,
    email: session.email,
    // Note: Name is not in JWT payload to keep it small. 
    // If needed, fetch from DB or add to payload.
  };
}

export async function logoutUser() {
  await AuthService.deleteSession();
}

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await AuthService.login(email, password);
    return { success: true, user };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
