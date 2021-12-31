import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import ReactPaginate from 'react-paginate';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts } = {}
  } = useQuery(FETCH_POSTS_QUERY);

  //Logic for pagination (19-27)
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 9;
  const pagesVisited = pageNumber * postsPerPage;
  
  const pageCount = posts ? Math.ceil(posts.length / postsPerPage) : '';

  const changePage = ({selected}) => {
    setPageNumber(selected);
  }

  return (
    <>
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.slice(pagesVisited, pagesVisited + postsPerPage).map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
              
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
    {loading ? ' ' : 
      <ReactPaginate 
      previousLabel = 'Previous'
      nextLabel = "Next"
      pageCount={pageCount}
      onPageChange= {changePage}
      containerClassName='paginationBttns'
      previousLinkClassName='previousBttn'
      nextLinkClassName='nextBttn'
      disabledClassName='paginationDisabled'
      activeClassName='paginationActive'
    />
    }
    </>
  );
}

export default Home;
