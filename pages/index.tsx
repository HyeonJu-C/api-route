import type { NextPage } from 'next';
import React, {
  FormEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';

interface Feedback {
  id: string;
  email: string;
  feedback: string;
}

const Home: NextPage = () => {
  const emailRef = useRef<null | HTMLInputElement>(null);
  const feedbackRef = useRef<null | HTMLTextAreaElement>(null);
  const [data, setData] = useState<null | Feedback[]>(null);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const email = emailRef?.current?.value;
    const feedback = feedbackRef?.current?.value;

    if (!email || !feedback) return;

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        email,
        feedback,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(console.log)
      .then(() => {
        emailRef!.current!.value = '';
        feedbackRef!.current!.value = '';
      });
  };

  const handleLoadClick: MouseEventHandler = () => {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setData(data.feedback));
  };

  return (
    <>
      <h2>send feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            name='email'
            id='email'
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor='feedback'>feedback</label>
          <textarea
            name='feedback'
            id='feedback'
            cols={30}
            rows={10}
            ref={feedbackRef}
          />
        </div>
        <button type='submit'>send</button>
      </form>
      <hr />
      <h2>get feedback</h2>
      <button onClick={handleLoadClick}>load all feedback</button>
      <ul>
        {data?.map(({ id, email, feedback }) => (
          <li key={`feedback_${id}`}>
            <h2>{email}</h2>
            <p>{feedback}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
