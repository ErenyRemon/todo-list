import { useState } from 'react';
import './App.css';
import List from './components/List/list';
import Login from './components/Login';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function App() {
  // const [mockUser] = useState({ uid: 'test-user' });
  const [user, setUser] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>

      {user ? (
        <>
          <div className='bodyApp ' style={{}}>
          <h2 className='helloName'>Hello, {user.displayName}</h2>
          <button className='logoutBtn' style={{borderRadius: '10px' , padding: '5px'}} onClick={handleSignOut}>Logout</button>
          </div>
          <List user={user} />
          
        </>
      ) : (
        <Login setUser={setUser} />
      )}
      {/* <List user={mockUser} /> */}
    </>
  );
}

export default App;

