import { Frog } from 'frog';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';
import { handle } from 'frog/next';
import { pinata } from 'frog/hubs'
import { neynar } from 'frog/middlewares'
import 'dotenv/config'

import { startPage } from './frames/startPage.tsx';
import { questionPage } from './frames/questionPage.tsx'
import {resultPage} from "./frames/resultPage.js";

export const app = new Frog({
    assetsPath: '/',
    basePath: '/api',
    title: 'Quiz',
    hub: pinata(),
}).use(
    neynar({
        apiKey: 'NEYNAR_FROG_FM',
        features: ['interactor', 'cast'],
    }));

app.frame('/', startPage);
app.frame('/question/:current', questionPage);
app.frame('/result/:score', resultPage);

const isProduction = typeof EdgeFunction !== 'undefined' || import.meta.env?.MODE !== 'development';
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
