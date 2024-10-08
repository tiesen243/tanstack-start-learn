/// <reference types="vinxi/types/client" />
import { StartClient } from '@tanstack/start'
import { hydrateRoot } from 'react-dom/client'

import { createRouter } from './router'

const router = createRouter()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
hydrateRoot(document.getElementById('root')!, <StartClient router={router} />)
