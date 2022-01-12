import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {
  FETCH_POSTS_QUERY,
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION
} from '../util/graphql';
import MyPopup from '../util/MyPopup';

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    optimisticResponse: (vars) => {
      if (!commentId) {
        return {
          deletePost: {
            id: vars.postId,
            __typename: 'Post'
          }
        };
      }
    },

    update: (cache) => {
      setConfirmOpen(false);
      if (!commentId) {
        // console.log(result);
        const data = cache.readQuery({
          query: FETCH_POSTS_QUERY
        });
        // // data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        // // proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });

        let updatedPosts = data.getPosts.filter((p) => p.id !== postId);

        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: [...updatedPosts]
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

DeleteButton.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};
export default DeleteButton;
