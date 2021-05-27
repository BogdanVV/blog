import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import { connect } from 'react-redux';
import { fetchPostById, fetchPosts } from '../store/actions/posts';
import PostCard from '../components/PostCard';
import { NextThunkDispatch, wrapper } from '../store';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { RootState } from '../store/reducers';

export type Post = {
    id?: string | number;
    title: string;
    body: string;
};

type Props = {
    posts: Post[];
    loading: boolean;
};

type PostsContainerProps = {
    readonly color: number;
};

const PostsContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  grid-row-gap: 20px;
`;

const AWithoutDecor = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

function LatestPosts(props: Props) {
    return (
        <MainLayout pageTitle="Latest Posts">
            <PostsContainer>
                {
                    // reverse - in order to show the latest posts at the top of page
                    props.posts.reverse().map((post: Post) => (
                        <div style={{ width: '100%', boxSizing: 'border-box' }}>
                            <Link href={`posts/${post.id}`} key={Math.random()}>
                                <AWithoutDecor style={{   textDecoration: 'none'}}>
                                    <PostCard
                                        post={post}
                                        key={Math.random()}
                                    />
                                </AWithoutDecor>
                            </Link>
                        </div>
                    ))
                }
            </PostsContainer>
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
    console.log(store);
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchPosts());
});

const mapStateToProps = (state: RootState) => {
    return {
        posts: state.posts.posts,
        loading: state.posts.isLoading,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchPostById: (id: number | string) => dispatch(fetchPostById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts);
