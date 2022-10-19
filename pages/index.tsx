import type { NextPage } from 'next';
import React, { FormEventHandler, useRef } from 'react';

const Home: NextPage = () => {
  const emailRef = useRef<null | HTMLInputElement>(null);
  const feedbackRef = useRef<null | HTMLTextAreaElement>(null);

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

  return (
    <>
      <h1>The Home Page</h1>
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
    </>
  );
};

export default Home;
