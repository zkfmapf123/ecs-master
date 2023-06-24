push:
	@git add .
	@git commit -m "wip"
	@git push origin master

back-push:
	@git add .
	@git commit -m "update backend"
	@git push origin deploy/backend

front-push:
	@git add .
	@git commit -m "update frontend"
	@git push origin deploy/frontend