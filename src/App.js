import { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/UserModule/SignIn/SignIn';
import { Dialog } from '@mui/material';
import SignUp from './components/UserModule/SignUp/SignUp';


function App() {

  const [displaySignInDialog, showSignInDialog] = useState(false);
  const [displayForgetPasswordDialog, showForgetPasswordDialog] = useState(false);
  const [displaySignUpDialog, showSignUpDialog] = useState(false);



  const handleForgetPasswordLinkClicked = () => {
    showSignInDialog(false);
    showSignUpDialog(false);
    showForgetPasswordDialog(true)
  }

  const handleSignUpLinkClicked = () => {
    showSignInDialog(false);
    showSignUpDialog(true);
    showForgetPasswordDialog(false)
  }

  const handleAlreadyhavingAccountLinkClicked = () => {
    showSignInDialog(true);
    showSignUpDialog(false);
    showForgetPasswordDialog(false)
  }

  return (
    <div className="App">
      <Navigation displaySignInDialog={() => showSignInDialog(true)} />

      <Dialog open={displaySignInDialog} >
        <SignIn displayForgetPasswordDialog={handleForgetPasswordLinkClicked} displaySignUpDialog={handleSignUpLinkClicked} closeSignInDialog={() => showSignInDialog(false)} />
      </Dialog >

      <Dialog open={displayForgetPasswordDialog} onClose={() => showForgetPasswordDialog(false)}>

      </Dialog>

      <Dialog open={displaySignUpDialog} maxWidth={'lg'}>
        <SignUp alreadyHavingAccount={handleAlreadyhavingAccountLinkClicked} closeSignUpDialog={() => showSignUpDialog(false)} />
      </Dialog>
    </div >
  );
}

export default App;
