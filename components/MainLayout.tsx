import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import { ReactChild } from 'react';

const MainLayoutContainer = styled.div`
  padding: 0;
`;

const NavHeader = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 80px;
  align-items: center;
  padding: 10px 20% 10px 20%;
  background-color: #3fc1c9;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const Main = styled.main`
  margin: 20px 200px;
`;

const LinksContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-evenly;
`;

const JokeContainer = styled.div`
  margin-top: 120px;
  margin-bottom: 40px;
  text-align: center;
`;

const PageTitle = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 24px;
  margin-left: 200px;
`;

type Props = {
    pageTitle?: string;
    children: ReactChild;
};

export default function MainLayout({ children, pageTitle }: Props) {
    return (
        <>
            <Head>
                {
                    pageTitle && <title>Blog | {`${pageTitle}`}</title>
                }
                <meta name="description" content="cool blog indeed"/>
            </Head>

            <MainLayoutContainer>
                <NavHeader>
                    <Logo src="https://www.eduneo.ru/wp-content/uploads/2016/11/blog.jpg"/>
                    <LinksContainer>
                        <Link href={'/'}>
                            <NavLink>
                                <div>Latest posts</div>
                            </NavLink>
                        </Link>
                        <Link href={'/posts/new'}>
                            <NavLink>
                                <div>Create a new post</div>
                            </NavLink>
                        </Link>
                    </LinksContainer>
                </NavHeader>

                <JokeContainer>This is significant, breathtaking and outstanding blog (no). Just so you know</JokeContainer>
                <PageTitle>{pageTitle}</PageTitle>

                <Main>
                    {children}
                </Main>
            </MainLayoutContainer>
        </>
    );
};
