import Layout from './Components/Layout';
import Header from './Components/Header';
import Container from './Components/Container';
import Card from './Components/Card';
import postsData from './data/posts.json';
import type { Post } from './types';

const posts: Post[] = postsData;

function App() {
  return (
    <Layout>
      <Header title="Baby Hippo Gram" />
      <Container>
        <Card cards={posts} />
      </Container>
    </Layout>
  );
}

export default App;
