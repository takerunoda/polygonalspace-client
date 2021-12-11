import React from "react";
import { signIn, useSession } from "next-auth/client";

export default function Page() {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {session ? (
        <p>Super secret page!</p>
      ) : (
        <p>
          <p>メンテナンス中です。</p>
          <p>しばらくお待ちください🙇🏻‍♂️</p>
          <button onClick={signIn}>Sign in</button>
        </p>
      )}
    </>
  );
}