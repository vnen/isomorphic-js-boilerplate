MOCHA = node_modules/.bin/_mocha
ZUUL = node_modules/.bin/zuul
ZUUL_PORT = 8081
ISTANBUL = node_modules/.bin/istanbul
ISTANBUL_COMMAND = cover
JSHINT = node_modules/.bin/jsxhint
JSHINT_REPORTER = unix
JSCS = node_modules/.bin/jscs
JSCS_REPORTER = inline
BROWSERIFY = node_modules/.bin/browserify
WATCHIFY = node_modules/.bin/watchify
BROWSERIFY_INPUT = assets/main.js
BROWSERIFY_OUTPUT = public/js/app.js
TESTS = test/*.test.js
NODE_ENV = test
REPORTER = spec
TIMEOUT = 3000
BIN = iojs

ifeq ($(findstring io.js, $(shell which node)),)
	BIN = node
endif

ifeq (node, $(BIN))
	FLAGS = --harmony-generators
endif

build: dep browserify

dep:
	npm install

browserify: $(BROWSERIFY) $(BROWSERIFY_INPUT)
	@$(BIN) $(FLAGS) \
		$(BROWSERIFY) $(BROWSERIFY_INPUT) \
			-o $(BROWSERIFY_OUTPUT)

watchify: $(WATCHIFY) $(BROWSERIFY_INPUT)
	@$(BIN) $(FLAGS) \
		$(WATCHIFY) $(BROWSERIFY_INPUT) \
			-o $(BROWSERIFY_OUTPUT) \
			-dv

jshint: $(JSHINT) $(JSCS)
	@echo "Running JSHint..."; \
	NODE_ENV=test $(BIN) $(FLAGS) \
		$(JSHINT) . --reporter=$(JSHINT_REPORTER) --jsx-only \
        && echo "JSHint ok!"

jscs:
	@echo "Running JSCS..."; \
	NODE_ENV=test $(BIN) $(FLAGS) \
		$(JSCS) . --reporter=$(JSCS_REPORTER) \
        && echo "JSCS ok!"

lint: jshint jscs

test: $(MOCHA)
	@NODE_ENV=$(NODE_ENV) \
		$(BIN) $(FLAGS) \
		$(MOCHA) \
		--timeout $(TIMEOUT) \
		--reporter $(REPORTER) \
		$(TESTS) \
		--compilers jsx:jsx-require-extension
		$(MOCHA_FLAGS)
    
test-browser: $(ZUUL)
	@NODE_ENV=$(NODE_ENV) \
		$(BIN) $(FLAGS) \
		$(ZUUL) --local $(ZUUL_PORT) $(TESTS)

test-cov: $(MOCHA) $(ISTANBUL)
	@NODE_ENV=$(NODE_ENV) $(BIN) $(FLAGS) \
		$(ISTANBUL) $(ISTANBUL_COMMAND) \
		$(MOCHA) \
		-- -u exports \
		--timeout $(TIMEOUT) \
		--reporter $(REPORTER) \
		$(TESTS) \
		--compilers jsx:jsx-require-extension
		$(MOCHA_FLAGS)

start: browserify
	@$(BIN) $(FLAGS) \
		index.js

clean:
	rm -rf node_modules

.PHONY: dep browserify watchify jshint jscs lint test test-cov server-dev clean