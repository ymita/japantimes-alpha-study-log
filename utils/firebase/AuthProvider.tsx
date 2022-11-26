import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from 'react'
  import type { User } from '@firebase/auth'
  import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { app } from './init'
  
  export type GlobalAuthState = {
    user: User | null | undefined
  }
  const initialState: GlobalAuthState = {
    user: undefined,
  }
  const AuthContext = createContext<GlobalAuthState>(initialState)
  
  type Props = { children: ReactNode }
  
  export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<GlobalAuthState>(initialState)
  
    useEffect(() => {
      try {
        const auth = getAuth(app);
        return onAuthStateChanged(auth, (user) => {
          setUser({
            user,
          })
        })
      } catch (error) {
        setUser(initialState)
        throw error
      }
    }, [])
  
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  }
  
  export const useAuthContext = () => useContext(AuthContext)