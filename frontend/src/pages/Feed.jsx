import React from 'react'
import FeedHero from '../componentsLib/FeedComponents/FeedHero'
import NavBar from '../componentsLib/LandingPageComps/NavBar'
import PostModal from '../componentsLib/FeedComponents/PostModal'

function Feed() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      <div className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-2xl shadow">
        <NavBar />
      </div>

      <div className="pt-20 px-4 mt-10">
        <FeedHero />
        
      </div>
      <PostModal/>
    </div>
  )
}

export default Feed
