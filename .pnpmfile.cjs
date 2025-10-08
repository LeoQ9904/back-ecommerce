module.exports = {
    hooks: {
        readPackage(pkg, context) {
            // En producción, no necesitamos husky ni otros hooks de desarrollo
            if (process.env.NODE_ENV === 'production' || process.env.DOCKER_ENV === 'production') {
                delete pkg.scripts.prepare;
                delete pkg.scripts.postinstall;
                delete pkg.scripts.preinstall;
            }

            return pkg;
        },
    },
};
