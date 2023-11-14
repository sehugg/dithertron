all:
	npm run build

watch:
	npm run clean
	sleep 9999999 | npm run esbuild-worker -- --watch &
	sleep 9999999 | npm run esbuild-ui -- --watch &
	node scripts/server.js

copylibs:
	@mkdir -p ./lib
	@cp node_modules/jquery/dist/jquery.min.js ./lib/
	@cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.js ./lib/
	@cp node_modules/bootstrap-slider/dist/bootstrap-slider.min.js ./lib/
	@cp node_modules/font-awesome/css/font-awesome.min.css ./lib/
	@cp node_modules/bootstrap/dist/css/bootstrap.min.css ./lib/
	@cp node_modules/cropperjs/dist/cropper.min.css ./lib/
	@cp node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css ./lib/
