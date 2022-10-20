import { getFeedbackPath, getFileData } from './api/feedback';

interface Feedback {
  id: string;
  email: string;
  feedback: string;
}

interface Props {
  data: Feedback[];
}

export default function Feedback({ data }: Props) {
  return (
    <>
      <h2>all feedback</h2>
      <ul>
        {data.map(({ id, email, feedback }) => (
          <li key={`feedback_${id}`}>
            <h2>{email}</h2>
            <p>{feedback}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

// 1. getStaticProps, getServerSideProps 함수 내에서 fetch 함수를 사용할 때, 여기에 전달하는 url은 절대 경로여야 한다.
// 2. 즉 => next.js를 통해 자체적으로 만든 api(상대 경로)는 사용 불가능하다.
// 3. 대신 => 현재 feedback data가 프로젝트 내에 포함된 파일이고,
//    getStaticProps 내부에서 서버 측의 코드를 작성할 수 있다는 사실을 이용한다.
// 4. 이 때 아래의 코드와 import 코드는 여전히 클라이언트 측의 번들에 포함되지 않는다.

export async function getStaticProps() {
  const filePath = getFeedbackPath();
  const feedback = getFileData(filePath);

  return {
    props: { data: feedback },
    revalidate: 30,
  };
}
