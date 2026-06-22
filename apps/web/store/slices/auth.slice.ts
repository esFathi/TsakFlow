import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthUser {
  name: string
  email: string
  avatarUrl?: string
}

interface AuthState {
  user: AuthUser | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")
}
