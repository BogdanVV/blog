import Image from 'next/image';
import styled from 'styled-components';
import { Post } from '../pages';

const PostCardContainer = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: #e4efe7;
  padding: 20px;
  box-sizing: border-box;
`;

const PostImage = styled.img`
  border-radius: 10px;
`;

const PostInfoContainer = styled.div`
  margin-left: 20px;
`;

const PostTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PostBody = styled.div`
  
`;

type Props = {
    post: Post,
};

export default function PostCard({ post }: Props) {
    return (
        <PostCardContainer>
            <PostImage src="https://picsum.photos/200?random=2"/>
            <PostInfoContainer>
                <PostTitle>Post title: {post?.title}</PostTitle>
                <div>Post body: {post?.body}</div>
            </PostInfoContainer>
        </PostCardContainer>
    );
};
