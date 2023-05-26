import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import db from './../../db.json'

interface Post {
  _id: string
  type: string
  phone: string
  name: {
    first: string
    last: string
  }
}

interface PostsData {
  data: Post[]
  total: number
}

const Tabs: React.FC = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('')
  const [posts, setPosts] = useState<PostsData>(db)

  useEffect(() => {
    const parsedData = JSON.parse(JSON.stringify(db)) as PostsData
    setPosts(parsedData)
  }, [])

  useEffect(() => {
    setActiveTab(location.search)
  }, [location])

  const PostsList: React.FC<{ type: string }> = ({ type }) => {
    const filteredPosts = useMemo(
      () => posts.data.filter((post) => post.type === type),
      [posts.data, type]
    )

    return (
      <div className="mt-4 w-full">
        <h2>Posts ({filteredPosts.length})</h2>
        <ul className="space-y-4">
          <div className="w-full flex justify-between p-2 ">
            <span>Name </span>
            <span>Phone</span>
          </div>
          {filteredPosts.map((post) => (
            <div
              className="w-full flex justify-between p-2 bg-white rounded shadow"
              key={post._id}
            >
              <span>{post.name.first}</span>
              <span>{post.phone}</span>
            </div>
          ))}
        </ul>
      </div>
    )
  }

  const tabLink = (tab: string, label: string) => (
    <Link
      to={`/navigator${tab}`}
      className={`inline-block px-4 py-2 text-gray-600 bg-white rounded shadow ${
        activeTab.includes(tab) ? 'bg-gray-200' : ''
      }`}
    >
      {label}
    </Link>
  )

  const tabLinks = [
    { tab: '?tab=0', label: 'Income' },
    { tab: '?tab=1', label: 'Outcome' },
    { tab: '?tab=2', label: 'Loan' },
    { tab: '?tab=3', label: 'Investment' },
  ]

  return (
    <div>
      <div className="container mx-auto py-5 flex justify-center items-start h-screen">
        <div className="flex flex-col items-center justify-center w-2/4 border p-5">
          <ul className="flex w-full justify-around border-b pb-4">
            {tabLinks.map((link) => (
              <li key={link.tab}>{tabLink(link.tab, link.label)}</li>
            ))}
          </ul>
          <div className="p-3 mt-6 border w-full">
            {activeTab.includes('?tab=0') && <PostsList type="income" />}
            {activeTab.includes('?tab=1') && <PostsList type="outcome" />}
            {activeTab.includes('?tab=2') && <PostsList type="loan" />}
            {activeTab.includes('?tab=3') && <PostsList type="investment" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tabs
