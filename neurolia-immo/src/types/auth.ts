export type UserRole = "owner" | "cleaning_staff" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  displayName: string | null;
  avatarUrl: string | null;
  ownerId: string | null;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}
