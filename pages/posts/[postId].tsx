import MainLayout from '../../components/MainLayout';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { NextThunkDispatch, wrapper } from '../../store';
import { clearCurrentPost, fetchPostById } from '../../store/actions/posts';
import { GetServerSideProps } from 'next';
import { Post } from '../index';
import styled from 'styled-components';
import { RootState } from '../../store/reducers';

type Props = {
    post: Post;
    fetchPostById: (id: number | string) => void;
};

const PostContainer = styled.div`
  background-color: #30e3ca;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const PostImage = styled.img`
  border-radius: 10px;
  margin: 20px auto;
`;

const PostInfoTitle = styled.div`
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
`;

const PostInfoBody = styled.div`
  font-weight: 400;
`;

function PostPage(props: Props) {
    const router = useRouter();

    const handleBackButtonPress = () => {
        router.push('/');
    };

    return (
        <MainLayout>
            <PostContainer>
                {props.post
                    ? (
                        <>
                            <PostImage src="https://picsum.photos/400?random=2"/>
                            <PostInfoTitle>
                                Post's id:
                                <br/>
                                <PostInfoBody>
                                    {props.post?.id}
                                </PostInfoBody>
                            </PostInfoTitle>
                            <PostInfoTitle>
                                Post's title:
                                <br/>
                                <PostInfoBody>
                                    {props.post?.title}
                                </PostInfoBody>
                            </PostInfoTitle>
                            <PostInfoTitle>
                                Post's body:
                                <br/>
                                <PostInfoBody>
                                    {props.post?.body}
                                </PostInfoBody>
                            </PostInfoTitle>
                        </>
                    )
                    : (<div>The post you are looking for was not found</div>)}
            </PostContainer>
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const dispatch = ctx.store.dispatch as NextThunkDispatch;
    await dispatch(await fetchPostById(`${ctx.query.postId}`));
});

const mapStateToProps = (state: RootState) => {
    return {
        post: state.posts.currentPost,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchPostById: (id: number | string) => dispatch(fetchPostById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
