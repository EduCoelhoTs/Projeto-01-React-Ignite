import './global.css'
import { Header } from './components/header/header'

import styles from './App.module.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Post } from './components/post/Post'
import { postList } from './posts'

function App() {

  const posts = postList;

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {/* Obs: Sempre que for iterar no html, usa-se o map, pois o map retorna algo. o foreach n retorna */}
          {posts.map(
            post => {
              return (
                <Post
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                />
              )
            }
          )}
        </main>
      </div>
    </div>
  )
}

export default App
