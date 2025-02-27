export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/users/likes",
    "/users/mypage", 
    "/stores/new", 
    "/stores/:id/edit",
  ] 
}