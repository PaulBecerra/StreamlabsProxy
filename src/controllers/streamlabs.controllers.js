import axios from 'axios'

const STREAMLABS_API_BASE = 'https://www.streamlabs.com/api/v1.0'
import User from "../models/User"
import { streamlabs_api_post } from '../utils/utils'


export const mute = async (req, res) => {
    let id = req.params.token
    let url = 'alerts/mute_volume'
    let messages = {
        'tokenFormat':'Error: token inválido.',
        'success':'Se ha muteado las alertas correctamente',
        'tokenNotFound': 'token incorrecto, actualiza su token...',
        'exception': 'Error intentando mutear las alertas'
    }
    streamlabs_api_post(id, url, messages,res)
}

export const pause = async (req, res) => {
    let id = req.params.token
    let url = 'alerts/pause_queue'
    let messages = {
        'tokenFormat':'Error: token inválido.',
        'success':'Se ha pausado las alertas correctamente',
        'tokenNotFound': 'token incorrecto, actualiza su token...',
        'exception': 'Error intentando pausar las alertas.'
    }
    streamlabs_api_post(id, url, messages,res)
}

export const skip = async (req, res) => {
    let id = req.params.token
    let url = 'alerts/skip'
    let messages = {
        'tokenFormat':'Error: token inválido.',
        'success':'Se ha saltado la alerta correctamente',
        'tokenNotFound': 'token incorrecto, actualiza su token...',
        'exception': 'Error intentando saltar la alerta.'
    }
    streamlabs_api_post(id, url, messages,res)
}

export const unmute = async (req, res) => {
    let id = req.params.token
    let url = 'alerts/unmute_volume'
    let messages = {
        'tokenFormat':'Error: token inválido.',
        'success':'Se ha desmuteado las alertas correctamente',
        'tokenNotFound': 'token incorrecto, actualiza su token...',
        'exception': 'Error intentando desmutear las alertas.'
    }
    streamlabs_api_post(id, url, messages,res)
}

export const unpause = async (req, res) => {
    let id = req.params.token
    let url = 'alerts/unpause_queue'
    let messages = {
        'tokenFormat':'Error: token inválido.',
        'success':'Se ha despausado las alertas correctamente',
        'tokenNotFound': 'token incorrecto, actualiza su token...',
        'exception': 'Error intentando despausar las alertas.'
    }
    streamlabs_api_post(id, url, messages,res)
}

export const jar = async (req, res) => {
    let id = req.params.token
    let url = 'jar/empty'
    let messages = {
        'tokenFormat':'Error: token inválido.',
        'success':'Se ha reiniciado la jarra correctamente',
        'tokenNotFound': 'token incorrecto, actualiza su token...',
        'exception': 'Error intentando reiniciar la jarra.'
    }
    streamlabs_api_post(id, url, messages,res)
}

export const authorize = async (req, res) => {
    let authorize_url = `${STREAMLABS_API_BASE}/authorize?`

    let params = {
        'client_id': process.env.CLIENT_ID,
        'redirect_uri': process.env.REDIRECT_URI,
        'response_type': 'code',
        'scope': 'alerts.write+jar.write+wheel.write',
    }

    // not encoding params
    authorize_url += Object.keys(params).map(k => `${k}=${params[k]}`).join('&')

    res.send(`<a href="${authorize_url}">Authorize with Streamlabs!</a>`)
}

export const token = async (req, res) => {

    const options = {
        'grant_type': 'authorization_code',
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
        'redirect_uri': process.env.REDIRECT_URI,
        'code': req.query.code
    }

    try {
        //generate tokens
        const tokens = await axios.post(`${STREAMLABS_API_BASE}/token`, options)
        //get user
        const user = await axios.get(`${STREAMLABS_API_BASE}/user?access_token=${tokens.data.access_token}`)
        
        const filter = {
            id_streamlabs_account: user.data.streamlabs.id
        }
        const update = {
            access_token: tokens.data.access_token,
            refresh_token: tokens.data.refresh_token
        }
        
        let userUpdated = await User.findOneAndUpdate(filter, update, {new: true})
        
        if (userUpdated) {
            res.json(userUpdated)
        } else {
            const newUser = new User({
                id_streamlabs_account: user.data.streamlabs.id,
                access_token: tokens.data.access_token,
                refresh_token: tokens.data.refresh_token
            })
            await newUser.save()
            res.json(newUser)
        }
    } catch (err) {
        console.log(err)
    }

}