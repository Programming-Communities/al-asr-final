'use client'

import React, { createContext, useContext, useReducer, useCallback } from 'react'

interface AppState {
  sidebarOpen: boolean
  searchOpen: boolean
  modalOpen: boolean
  currentModal: string | null
  notifications: Notification[]
}

type Notification = {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

type AppAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'OPEN_MODAL'; payload: string }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }

const initialState: AppState = {
  sidebarOpen: false,
  searchOpen: false,
  modalOpen: false,
  currentModal: null,
  notifications: [],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'TOGGLE_SEARCH':
      return { ...state, searchOpen: !state.searchOpen }
    case 'OPEN_MODAL':
      return { ...state, modalOpen: true, currentModal: action.payload }
    case 'CLOSE_MODAL':
      return { ...state, modalOpen: false, currentModal: null }
    case 'ADD_NOTIFICATION':
      const notification: Notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
      }
      return {
        ...state,
        notifications: [...state.notifications, notification],
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      }
    default:
      return state
  }
}

interface AppContextType extends AppState {
  toggleSidebar: () => void
  toggleSearch: () => void
  openModal: (modal: string) => void
  closeModal: () => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }, [])

  const toggleSearch = useCallback(() => {
    dispatch({ type: 'TOGGLE_SEARCH' })
  }, [])

  const openModal = useCallback((modal: string) => {
    dispatch({ type: 'OPEN_MODAL', payload: modal })
  }, [])

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' })
  }, [])

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  }, [])

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }, [])

  const value: AppContextType = {
    ...state,
    toggleSidebar,
    toggleSearch,
    openModal,
    closeModal,
    addNotification,
    removeNotification,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
