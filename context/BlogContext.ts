import React from "react"

export type UserState = {
  username: string,
  id: number
};

export interface BlogContextState {
  user: UserState | null,
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