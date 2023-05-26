import React, { useEffect, useState, useMemo} from 'react'

import styles from './Home.module.scss'
import db from '../../db.json'
import { useNavigate } from 'react-router-dom'

interface Post {
  type: string
}

interface PostsData {
  data: Post[]
  total: number
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<PostsData>(db)

  useEffect(() => {
    const parsedData = JSON.parse(JSON.stringify(db)) as PostsData
    setPosts(parsedData)
  }, [])


  const typesCount = useMemo(
    () =>
      (type: string): number => {
        return posts.data.reduce((count, e) => {
          if (e.type === type) {
            return count + 1
          }
          return count
        }, 0)
      },
    [posts.data]
  )


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.hero_card}>
          <h3>welcome </h3>
          <span>
            With supporting text below as a natural lead-in to additional
            content
          </span>
          <button>
            See transactions
            <span>You have {posts.total} transactions!</span>
          </button>
        </div>
        <div className={styles.cards_wrapper}>
          <div className={styles.card}>
            <h3> {typesCount('income')}</h3>
            <span>income</span>
            <button onClick={() => navigate('navigator?tab=0')}>
              See transactions
            </button>
          </div>
          <div className={styles.card}>
            <h3> {typesCount('investment')}</h3>
            <span>investment</span>
            <button onClick={() => navigate('navigator?tab=1')}>
              See transactions
            </button>
          </div>
          <div className={styles.card}>
            <h3> {typesCount('outcome')}</h3>
            <span>outcome</span>
            <button onClick={() => navigate('navigator?tab=2')}>
              See transactions
            </button>
          </div>
          <div className={styles.card}>
            <h3> {typesCount('loan')}</h3>
            <span>loans</span>
            <button onClick={() => navigate('navigator?tab=3')}>
              See transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
