import {useState, useRef} from 'react'
import { useRouter } from 'next/router';
import '../styles/index.css'
import Layout from '../components/Layout'
import Link from 'next/link'

const axios = require('axios').default;

const Login = ({isLoggedIn}) => {
    const router = useRouter();

    if (isLoggedIn) {
      router.push('/lists');
    }
    

    const [error, setError] = useState({isError: false, errorMessage: ''});
    let usernameRef = useRef();
    let passwordRef = useRef();
   

    async function handleLogin() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            setError(prevError => {
            return {
                isError: true,
                errorMessage: 'Please provide username and/or password'
            }
            });
            return;
        }

        setError(prevError => {
            return {
                isError: false,
                errorMessage: ''
            }
        });

        try {
            const result = await axios.post('/api/login', {
                username,
                password
            });

            if (result.data.token) {
                localStorage.setItem('token', result.data.token);
                router.push('/lists');
            }

            router.push('/lists');

        } catch (err) {
            setError(prevError => {
                return {
                    isError: true,
                    errorMessage: 'Username and/or password you provided are incorrect'
                }
            });
        }
    }

    return (
    <Layout> 
    <div className="container mx-auto">
    <div className="flex justify-center px-6 my-12">
      <div className="w-full xl:w-3/4 lg:w-11/12 flex">
        <div
          className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 rounded-l-lg card-image"
        ></div>
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          {error.isError && <p className="text-xs italic text-red-500 bg-red-200 p-2 rounded">{error.errorMessage}</p>}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                ref={usernameRef}
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Email"
                onFocus={()=> setError({isError: false, errorMessage: ''})}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                ref={passwordRef}
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border {/*border-red-500*/} rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                onFocus={()=> setError({isError: false, errorMessage: ''})}
              />
            </div>
            <div className="mb-6 text-center">
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
            <Link href="/register">
              <a
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="./register.html"
              >
                Create an Account!
              </a>
            </Link>
            </div>
            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="./forgot-password.html"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
        <style jsx>{`
        .card-image {
            background-image: url('https://source.unsplash.com/ck0i9Dnjtj0/600x800');
        }
      `}</style>
    </Layout>
    )
}

Login.getInitialProps = async ctx => {

  if (typeof(window) === 'undefined') {
      ctx.res.statusCode = 301;
      ctx.res.setHeader('Location','/');
      return {isLoggedIn: false}
  }

  const token = localStorage.getItem('token');
  if (!token) return {isLoggedIn: false}

  try {
      const response = await axios.post('/api/is-authenticated', {token});
      return {isLoggedIn: true}
  } catch (err) {
      return {isLoggedIn: false}
  }

}

export default Login;