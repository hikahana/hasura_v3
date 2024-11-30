run:
	docker compose up -d
	sleep 10
	make db-apply

down:
	docker compose down

db/apply:
	docker compose exec api hasura metadata apply
	docker compose exec api hasura migrate apply --database-name default
	docker compose exec api hasura metadata reload

db/export:
	docker compose exec api hasura metadata export
	docker compose exec api hasura migrate create "auto" --from-server --database-name default

db/seed:
	docker compose exec api hasura seed apply

codegen:
	docker compose run --rm app npm run codegen
