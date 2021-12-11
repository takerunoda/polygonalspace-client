import React from 'react'
import { signOut } from 'next-auth/client';

//Log out of next auth login
export default function Logout() {
  return (<>
      <main>
        <>
          <div></div> 
          <button onClick={signOut}>Sign out</button>
        </>
       </main>
    </>
  ) 
}
