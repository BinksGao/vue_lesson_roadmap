dev: 
	npm run dev
run:
	npm run build
	tar -zcf dist.tar.gz dist
clean:
	rm -rf dist
	rm -rf dist.tar.gz