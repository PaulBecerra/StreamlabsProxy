import {Router} from 'express'
import dotenv from 'dotenv'
dotenv.config()
const router = Router()

import * as streamlabsCtrl from '../controllers/streamlabs.controllers'

router.get('/', streamlabsCtrl.authorize)

router.get('/mute/:token', streamlabsCtrl.mute)

router.get('/pause/:token', streamlabsCtrl.pause)

router.get('/skip/:token',streamlabsCtrl.skip)

router.get('/unmute/:token', streamlabsCtrl.unmute)

router.get('/unpause/:token', streamlabsCtrl.unpause)

router.get('/jar/:token', streamlabsCtrl.jar)

router.get('/auth',streamlabsCtrl.token)

export default router;