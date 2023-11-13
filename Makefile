all:
	npm run build

watch:
	npm run clean
	sleep 9999999 | npm run esbuild-worker -- --watch &
	sleep 9999999 | npm run esbuild-ui -- --watch &
	node scripts/server.js
