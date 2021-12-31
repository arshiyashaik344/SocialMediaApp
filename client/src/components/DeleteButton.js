import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import MyPopup from '../util/MyPopup';

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {

    optimisticResponse: (vars) => {
     if (!commentId) {
       return {
         deletePost : {
          id: vars.postId,
          __typename:'Post'
         }
       }
     }
    },

    update: (cache, result) => {
      setConfirmOpen(false);
      if (!commentId) {

        console.log(result);
        const data = cache.readQuery({
          query: FETCH_POSTS_QUERY
        });
        // // data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        // // proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });

        let updatedPosts = data.getPosts.filter((p) => p.id !== postId );

        cache.writeQuery({
          query : FETCH_POSTS_QUERY,
          data : {
            ...data,
            getPosts : [...updatedPosts]
          }
        });

        // cache.modify({
        //   fields: {
        //     posts : (existingPosts) => {
        //       return existingPosts.filter((postRef) => {
        //         return cache.identify(postRef) !== postId;
        //       });
        //     }
        //   }
        // });

        cache.evict({ id: postId });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
