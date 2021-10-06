import axios from 'axios'
const STREAMLABS_API_BASE = 'https://www.streamlabs.com/api/v1.0'
import User from "../models/User"

export const streamlabs_api_post = async (id, url, messages,res) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.send(messages['tokenFormat']);
    try {
        let user = await User.findById(id)
        if (user) {
            await axios.post(`${STREAMLABS_API_BASE}/${url}`, { access_token: user.access_token })
            res.send(messages['success'])
        } else {
            res.send(messages['tokenNotFound'])
        }

    } catch (err) {
        res.send(messages['exception'])
        console.log(err)
    }
}