import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-5c784.firebaseio.com'
})