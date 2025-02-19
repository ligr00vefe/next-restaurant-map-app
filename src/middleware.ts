export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/users/mypage", 
    "/stores/new", 
    "/stores/:id/edit",
    "/stores_infinite/new", 
    "/stores_infinite/:id/edit",
    "/users/likes",
  ] 
}