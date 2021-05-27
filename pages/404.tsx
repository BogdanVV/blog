import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NotFoundText = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding-top: 50px;
  margin-bottom: 20px;
`;

const NotFoundTravolta = styled.img`
  height: 200px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export default function NotFound() {
    return (
        <>
            <MainLayout>
                <NotFoundContainer>
                    <NotFoundText>404. Page was not found</NotFoundText>
                    <NotFoundTravolta src="https://kor.ill.in.ua/m/1200x0/1711470.jpg"/>
                    <Link href="/">
                        <a>
                            Move to the main page
                        </a>
                    </Link>
                </NotFoundContainer>
            </MainLayout>
        </>
    );
}
