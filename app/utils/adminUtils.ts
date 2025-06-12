import { Session } from "next-auth";

export const ADMIN_EMAIL = "jakajeke17@gmail.com";

export function isAdminUser(userEmail: string | null | undefined): boolean {
  return userEmail === ADMIN_EMAIL;
}

export function getRefreshStatus(session: Session | null, currentUsage: number, maxRefreshes: number) {
  const isAdmin = isAdminUser(session?.user?.email);
  
  return {
    isAdmin,
    canRefresh: isAdmin || currentUsage < maxRefreshes,
    remainingRefreshes: isAdmin ? Infinity : maxRefreshes - currentUsage,
    displayText: isAdmin 
      ? "Admin access: unlimited boosts" 
      : `${maxRefreshes - currentUsage} refreshes remaining today`
  };
} 