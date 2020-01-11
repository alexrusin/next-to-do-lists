import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import '../styles/index.css'
import Layout from '../components/Layout'
import Link from 'next/link'
import isEmail from 'validator/lib/isEmail'

const axios = require('axios').default

const Register = () => {
    const [error, setError] = useState({isError: false, errorMessage: ''});
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const router = useRouter();

    useEffect(() => {
        if (!email) return;
        if(!isEmail(email)) {
            setEmailError('Email is invalid');
        } else {
            setEmailError('');
        }
    }, [email]);

    useEffect(() => {
        if (!password) return;
        
        if(password.length < 6) {
            setPasswordError('Password should be more than 6 characters');
        } else {
            
            setPasswordError('');
        }
    }, [password]);

    useEffect(() => {
        if (!confirmPassword) return;
        
        if(confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            
            setConfirmPasswordError('');
        }
    }, [confirmPassword]);

    const dissableRegister = () => {
        return name && email;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (!name) {
            setError({isError: true, errorMessage: 'Name can\'t be blank'});
            return;
        }

        axios.post('/api/register', {
            name,
            email,
            password
        }).then(({data}) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                router.push('/lists');
            }
        }).catch((error) => {
            if (error.response.data.errorMessage) {
                setError({isError: true, errorMessage: error.response.data.errorMessage});
            } else {
                console.log(error);
            }
        })

        
    }

    // async function handleRegister() {

    //     if (!username || !password) {
    //         setError(prevError => {
    //         return {
    //             isError: true,
    //             errorMessage: 'Please provide username and/or password'
    //         }
    //         });
    //         return;
    //     }

    //     setError(prevError => {
    //         return {
    //             isError: false,
    //             errorMessage: ''
    //         }
    //     });

    //     try {
    //         const result = await axios.post('/api/login', {
    //             username,
    //             password
    //         });

    //         router.push('/lists');

    //     } catch (err) {
    //         console.log(err);
    //         setError(prevError => {
    //             return {
    //                 isError: true,
    //                 errorMessage: 'Username and/or password you provided are incorrect'
    //             }
    //         });
    //     }
    // }

    return (
    <Layout> 
    <div className="container mx-auto">
    <div className="flex justify-center px-6 my-12">
      <div className="w-full xl:w-3/4 lg:w-11/12 flex">
        <div
          className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 rounded-l-lg card-image"
        ></div>
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <h3 className="pt-4 text-2xl text-center">Register</h3>
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
          onSubmit={handleRegister}>
          {error.isError && <p className="text-xs italic text-red-500 bg-red-200 p-2 rounded">{error.errorMessage}</p>}
            <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
                Name
            </label>
            <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onFocus={() => setError({isError: false, errorMessage: ''})}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-xs italic text-red-500">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border {/*border-red-500*/} rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {passwordError && <p className="text-xs italic text-red-500">{passwordError}</p>}

            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border {/*border-red-500*/} rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="******************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {confirmPasswordError && <p className="text-xs italic text-red-500">{confirmPasswordError}</p>}

            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!dissableRegister()}
              >
                Register
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
            <Link href="/login">
           
              <a
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              >
                Already registered? Login.
              </a>
            </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
        <style jsx>{`
        .card-image {
            background-image: url('https://source.unsplash.com/RLw-UC03Gwc/600x800');
        }
      `}</style>
    </Layout>
    )
}

export default Register;