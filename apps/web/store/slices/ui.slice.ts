import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  sidebarCollapsed: boolean
  theme: "light" | "dark" | "system"
}

const initialState: UiState = {
  sidebarCollapsed: false,
  theme: "system",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload
    },
    setTheme(state, action: PayloadAction<UiState["theme"]>) {
      state.theme = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarCollapsed, setTheme } = uiSlice.actions
export default uiSlice.reducer
