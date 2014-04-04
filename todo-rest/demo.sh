curl -XPOST http://localhost:1919/todo -d 'go for a run' # expect 200
curl http://localhost:1919/todo/0 # expect 200, go for a run
curl -XPUT http://localhost:1919/todo/0 -d 'go for a long run' # expect 200
curl http://localhost:1919/todo/0 # expect 200, go for a long run
curl -XDELETE http://localhost:1919/todo/0 # expect 200
curl http://localhost:1919/todo/0 # expect 404
