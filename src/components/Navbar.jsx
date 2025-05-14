import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-zinc-800 text-white">
  {/* Logo */}
  <div className="logo text-lg font-bold bg-zinc-500 px-4 py-2 rounded">
    a
  </div>

  {/* Search form */}
  <form action="" className="flex-1 mx-6">
    <input
      type="text"
      placeholder="Search..."
      className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crimson"
    />
  </form>

  {/* Cart or right-side content */}
  <div className="cart text-sm bg-crimson-600 px-4 py-2 rounded">
    advdsvs
  </div>
</div>

  )
}

export default Navbar