import esbuild from 'esbuild';


esbuild.build({
    entryPoints: {
        app: 'src/index.ts',
        init: 'src/init.ts',
    }
})
