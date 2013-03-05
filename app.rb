require 'cuba'
require 'pg'
require 'sequel'
require 'json'

db_name = ENV['TEST'] ?  'vocabulary_test' : 'vocabulary'
db_url = ENV['VOCAB_DB_URL']
db_username = ENV['VOCAB_DB_USERNAME']
db_password = ENV['VOCAB_DB_PASSWORD']
$db = Sequel.postgres(db_name, host: db_url, username: db_username, password: db_password)

Cuba.use Rack::Static,
  root: "public",
  urls: ["/favicon.ico", "/index.html", "/js", "/css", "/font", "/img"]

Dir["./models/**/*.rb"].each { |rb| require rb }

Cuba.define do
  on get do
    on "users/:username/words" do |username|
      user = User.find_by_username(username)
      res["Content-Type"] = "application/json; charset=utf-8"
      res.status = 200
      res.write user.words_json
    end

    on default do
      res.status = 404
      res.write "404 Not Found"
    end
  end

  on put do
    on 'users/:username/words/:id' do |username, word_id|
      word = Word.find(word_id)
      model = JSON.parse(req.body.read)
      word.update(deleted: model["deleted"])
      res.headers.delete("Content-Type")
      res.status = 204
    end
  end

  on post do
    on 'users/:username/words' do |username|
      user = User.find_by_username(username)
      model = JSON.parse(req.body.read)
      word_id = Word.create(user_id: user.id, name: model["name"], added_on: model["addedOn"])
      word = Word.find(word_id)
      res.status = 201
      res["Content-Type"] = "application/json; charset=utf-8"
      response = word.to_attributes.to_json
      res.write response
    end

    on 'users/new', param("username"), param("password_hash") do |username, password_hash|
      user = User.create(username: username, password_hash: password_hash)
      res.status = 201
      res.write "Created"
    end

    on 'auth/login', param("username"), param("password_hash") do |username, password_hash|
      user = User.find_by_username(username)
      if user && user.password_hash == password_hash
        res.status = 200
        res.write "Success"
      else
        res.status = 401
        res.write "Forbidden"
      end
    end

    on default do
      res.status = 404
      res.write "404 Not Found"
    end
  end
end
