import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import MainLayout from '../../components/MainLayout';
import http from '../../utilities/http';
import { Post } from '../index';
import styled from 'styled-components';

const Prompt = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  background-color: #a6e3e9;
  padding: 20px 40px 40px 40px;
  border-radius: 20px;
`;

const Label = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
`;

const TitleInput = styled(Field)`
  font-size: 18px;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  display: block;
  box-sizing: border-box;
`;

const BodyInput = styled(Field)`
  font-size: 18px;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  display: block;
  box-sizing: border-box;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  padding: 20px 40px;
  border-radius: 10px;
  border: none;
  background-color: #fff;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin-top: 30px;
  margin-left: 30px;
  color: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  border: none;
  background-color: #52616b;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`;

export default function NewPostCreation() {
    const router = useRouter();

    const handleSubmit = async (post: Post) => {
        console.log(post);
        http.post('posts', post)
            .then(({ data }) => {
                router.push(`/posts/${data.id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const SignupSchema = Yup.object().shape({
        title: Yup.string()
            .min(10, 'At least 10 characters!')
            .max(50, 'Come on! Write something laconic within 50 characters!')
            .required('Required'),
        body: Yup.string()
            .min(20, 'The text is too short. Minimum 20 characters!')
            .max(320, 'You exceeded the limit of characters! Maximum is 320!')
            .required('Required'),
    });

    return (
        <MainLayout pageTitle="New Post Creation">
            <>
                <Prompt>
                    Create a new post!
                    <br/>
                    Inform the whole world about your brilliant ideas or stories!
                    <br/>
                    As if someone cares about it.
                </Prompt>
                <FormContainer>
                    <Formik
                        initialValues={{
                            title: '',
                            body: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Label>New post's title (between 10 and 50 characters)</Label>
                                <TitleInput
                                    name="title"
                                    placeholder="Write down the title of your post"
                                />
                                {errors.title && touched.title ? (
                                    <div>{errors.title}</div>
                                ) : null}
                                <Label>New post's text (between 20 and 320 characters)</Label>
                                <BodyInput
                                    placeholder="Write down the post itself"
                                    name="body"
                                    rows={10}
                                />
                                {errors.body && touched.body ? (
                                    <div>{errors.body}</div>
                                ) : null}
                                <ButtonsContainer>
                                    <SubmitButton type="submit">Submit</SubmitButton>
                                    <CancelButton
                                        onClick={() => {
                                            router.back();
                                        }}
                                    >
                                        Cancel
                                    </CancelButton>
                                </ButtonsContainer>
                            </Form>
                        )}
                    </Formik>
                </FormContainer>
            </>
        </MainLayout>
    );
};
