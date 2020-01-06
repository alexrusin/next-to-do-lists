import '../styles/index.css'
import Layout from '../components/Layout'
const axios = require('axios').default;

const CheckConnection = props => {
    return (
    <Layout>
        <p>Name: {props.name}</p>
        <p>Email: {props.email}</p>
    </Layout>
    )
}


CheckConnection.getInitialProps = async function() {
    
    const response = await axios.get('/api/database-connection');

    return {
        name: response.data.name,
        email: response.data.email
    }
}

export default CheckConnection;