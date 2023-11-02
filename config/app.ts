import { AppConfig, DatabaseProvider } from '@Typetron/Framework'
import { RoutingProvider } from 'App/Providers/RoutingProvider'
import { AppProvider } from 'App/Providers/AppProvider'

export default new AppConfig({
    port: 8000,
    environment: 'development',
    server: 'uNetworking',
    middleware: {
        global: [],
        http: [],
        websocket: [],
    },
    providers: [
        AppProvider,
        RoutingProvider,
        DatabaseProvider
    ],
    staticAssets: [
        {
            url: '.*',
            path: 'public'
        },
        {
            url: '.*',
            path: 'public/frontend',
            basePath: true
        },
    ]
})
