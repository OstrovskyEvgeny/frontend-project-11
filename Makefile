develop:
	npx webpack serve

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

lint:
	npx eslint .

fix:
	npx eslint . --fix

.PHONY: test