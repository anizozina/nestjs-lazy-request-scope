# Reproduction Repository for NestJS Issue

This repository is created to reproduce a specific issue in NestJS.

## 🐛 Issue Description

When using **lazy-loaded modules**, if a **Request-Scoped provider** depends on a **Singleton provider**, the Singleton provider becomes `undefined`.  
Related issue: https://github.com/nestjs/nest/issues/13761

## 🔧 Steps to Reproduce

1. Start the server:  
```sh
pnpm run start
```

2. Execute the following command twice:
```
curl localhost:3000/not-work
```

You will notice that the Singleton provider is undefined on the second request. 

<details>
<summary>Server logs:</summary>
```
❯ pnpm run start              

> nest-typescript-starter@1.0.0 start /Users/anizozina/workspaces/repro-lazyload-scope
> nest start

[Nest] 43814  - 2025/03/18 6:34:21     LOG [NestFactory] Starting Nest application...
[Nest] 43814  - 2025/03/18 6:34:21     LOG [InstanceLoader] AppModule dependencies initialized +4ms
[Nest] 43814  - 2025/03/18 6:34:21     LOG [RoutesResolver] AppController {/}: +1ms
[Nest] 43814  - 2025/03/18 6:34:21     LOG [RouterExplorer] Mapped {/not-work, GET} route +1ms
[Nest] 43814  - 2025/03/18 6:34:21     LOG [NestApplication] Nest application successfully started +1ms
[Nest] 43814  - 2025/03/18 6:34:32     LOG [LazyModuleLoader] LazyModule dependencies initialized
initialized ServiceTwo {}
resolved
this.serviceTwo: ServiceTwo {}
[Nest] 43814  - 2025/03/18 6:34:33     LOG [LazyModuleLoader] LazyModule dependencies initialized
true
initialized ServiceTwo {}
resolved
this.serviceTwo: undefined
[Nest] 43814  - 2025/03/18 6:34:33   ERROR [ExceptionsHandler] TypeError: Cannot read properties of undefined (reading 'getHello')
    at ServiceOne.getHello (/Users/anizozina/workspaces/repro-lazyload-scope/src/lazy/one.service.ts:13:28)
    at AppController.notWork (/Users/anizozina/workspaces/repro-lazyload-scope/src/app.controller.ts:23:21)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async /Users/anizozina/workspaces/repro-lazyload-scope/node_modules/.pnpm/@nestjs+core@11.0.11_@nestjs+common@11.0.11_reflect-metadata@0.2.2_rxjs@7.8.2__@nestjs+_45f918b06213b04637710244f5729595/node_modules/@nestjs/core/router/router-execution-context.js:46:28
    at async /Users/anizozina/workspaces/repro-lazyload-scope/node_modules/.pnpm/@nestjs+core@11.0.11_@nestjs+common@11.0.11_reflect-metadata@0.2.2_rxjs@7.8.2__@nestjs+_45f918b06213b04637710244f5729595/node_modules/@nestjs/core/router/router-proxy.js:9:17
```
</details>

