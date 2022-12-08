import React from "react"

export type UserState = {
  username: string,
  id: number
} | null;

export interface BlogContextState {
  user: UserState,
  isLoggedIn: boolean,
  func: {
    logout(): void
  }
}

const BlogContext = React.createContext<BlogContextState>({
  user: null,
  isLoggedIn: false,
  func : {
    logout: () => {}
  },
})

export default BlogContext;