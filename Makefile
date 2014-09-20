.POSIX:

FLAGS=--language_in ECMASCRIPT3 --charset UTF8

all: build min
build: build/ding.js
min: build/ding.min.js

build/ding.js: src/ding.js src/framework.js src/license.js README.md
	( cat src/license.js; printf '\n\n'; shell/annotate.sh $< README.md | shell/include.sh ) > $@

build/%.min.js: build/%.js
	( cat src/license.js; printf '\n'; closure-compiler $(FLAGS) --js $< ) > $@

clean:
	rm build/ding.js build/ding.min.js
