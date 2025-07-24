import React, { useState } from "react"
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react"
import { useAppStore } from "../../store/store"
import { Link, useNavigate } from "react-router-dom"
import { RxHamburgerMenu } from "react-icons/rx"
import ContextMenu from "../auth/ContextMenu"

const Navbar = () => {
  const { userInfo, setUserInfo } = useAppStore()
  const { isConnected, principal } = useConnect({
    onDisconnect: () => {
      setUserInfo(null)
    },
  })
  const navigate = useNavigate()
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)

  const contextMenuOptions = [
    {
      name: "About",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
  ]

  const authenticatedMenuOptions = [
    {
      name: "Dashboard",
      callBack: () => {
        setIsContextMenuVisible(false)
        navigate("/tutorials/incoming")
      },
    },
    {
      name: "New Tutorial",
      callBack: () => {
        setIsContextMenuVisible(false)
        navigate("/tutorials/new")
      },
    },
    {
      name: `Principal ID: ${principal ? principal.toString().substring(0, 20) + '...' : 'Loading...'}`,
      callBack: () => {
        if (principal) {
          navigator.clipboard.writeText(principal.toString())
          alert(`Principal ID copied to clipboard: ${principal.toString()}`)
        }
        setIsContextMenuVisible(false)
      },
    },
    {
      name: "Help ",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
  ]

  return (
    <nav>
      <div className="w-full h-24 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-zinc-950 dark:to-zinc-900 border-b border-slate-700">
        <div className="flex items-center justify-between h-full px-8">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                BlockAcademia
              </span>
            </Link>

            <div className="flex gap-8 ml-6">
              <Link
                to="/"
                className="text-slate-300 hover:text-cyan-400 transition-all font-medium relative 
            before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 
            before:bg-cyan-400 before:transition-all hover:before:w-full"
              >
                Home
              </Link>
              <Link
                to="/tutorials"
                className="text-slate-300 hover:text-cyan-400 transition-all font-medium relative 
            before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 
            before:bg-cyan-400 before:transition-all hover:before:w-full"
              >
                Tutorials
              </Link>
              <Link
                to="/tutorials/incoming"
                className="text-slate-300 hover:text-cyan-400 transition-all font-medium relative 
            before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 
            before:bg-cyan-400 before:transition-all hover:before:w-full"
              >
                Admin Panel
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {isConnected && principal && (
              <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-lg">
                <span className="text-slate-300 text-sm">Principal:</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(principal.toString())
                    alert(`Principal ID copied: ${principal.toString()}`)
                  }}
                  className="text-cyan-400 text-sm font-mono hover:text-cyan-300 cursor-pointer"
                  title="Click to copy full principal ID"
                >
                  {principal.toString().substring(0, 15)}...
                </button>
              </div>
            )}
            <ConnectButton className="!bg-cyan-600 !hover:bg-cyan-500 !px-6 !py-3 !rounded-xl" />

            <div
              className="relative flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 cursor-pointer transition-colors"
              onClick={() => setIsContextMenuVisible(!isContextMenuVisible)}
            >
              <div className="relative">
                {userInfo?.avatar?.length > 0 ? (
                  <img
                    src={userInfo.avatar[0]}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-cyan-400"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-cyan-600 rounded-full text-white font-bold">
                    {userInfo?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                  <RxHamburgerMenu className="text-slate-900 w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ConnectDialog />

        {isContextMenuVisible && (
          <ContextMenu
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
            cordinates={{ x: window.innerWidth - 280, y: 90 }}
            options={userInfo ? authenticatedMenuOptions : contextMenuOptions}
            className="!bg-slate-800 !border !border-slate-700 !rounded-xl !py-3 !shadow-xl"
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar
