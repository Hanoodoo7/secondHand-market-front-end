import { Link } from 'react-router-dom'

const NavBar = (props) => {

  return (
    <nav>
      <ul>
        <li><Link to="/"> Home </Link></li>
        <li><Link to="/item"> Hoots </Link></li>
      {props.user ? (
        <>
          <li>Welcome {props.user.username}</li>
          <li><Link to="/item/new">New Hoot</Link></li>
          <li><Link to='/' onClick={props.handleSignOut}>Sign Out</Link></li>
        </>
        ) : (
          <>
            <li><Link to="/sign-up">Sign Up</Link></li>
            <li><Link to="/sign-in">Sign In</Link></li>
          </>
          ) }
        </ul>
    </nav>
  )
}

export default NavBar 