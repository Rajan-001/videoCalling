import { io } from "socket.io-client"
import React, { useMemo } from "react"

const SocketContext = React.createContext(null)

export const useSocket = () => {
  return React.useContext(SocketContext)
}

export const SocketProvider = (props: any) => {
  const socket = useMemo(() => io(`http://localhost:8001`), [])
  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  )
}
