export const isPublic = (path) =>
  path && (path.includes("/login") || path.includes("/register"));
