require_relative 'test_helper'

scope do
  test "failed login API" do
    params = { username: "sean", password_hash: "password" }

    post "/auth/login", params

    assert_equal 401, last_response.status
    assert_equal "Forbidden", last_response.body
  end

  test "sucecssful login API" do
    User.create(username: "sean", password_hash: "password")
    params = { username: "sean", password_hash: "password" }

    post "/auth/login", params

    assert_equal 200, last_response.status
    assert_equal "Success", last_response.body
  end

  test "create user API" do
    params = { username: "sean", password_hash: "password" }

    post "/users/new", params

    assert_equal 201, last_response.status
    assert_equal "Created", last_response.body
  end

  test "create word API" do
    User.create(username: "sean")
    params = { name: "hola", notes: "this is a greeting", addedOn: "1359470665" }

    post "/users/sean/words", params.to_json, {"HTTP_CONTENT_TYPE" => "application/json"}

    assert_equal "application/json; charset=utf-8", last_response.headers['Content-Type']
    assert_equal 201, last_response.status
    assert_equal "this is a greeting", JSON.parse(last_response.body)["notes"]
  end

  test "get words API" do
    User.create(username: "sean")

    get "/users/sean/words"

    assert_equal "[]", last_response.body
    assert_equal "application/json; charset=utf-8", last_response.headers['Content-Type']
    assert_equal 200, last_response.status
  end

  test "update word API" do
    user_id = User.create(username: "sean")
    attrs = { user_id: user_id, name: "hola", added_on: "1359470665" }
    word_id = Word.create(attrs)
    attrs.merge!({ deleted: "true" })
    params = { model: attrs.to_json }

    put "/users/sean/words/#{word_id}", params.to_json, {"HTTP_CONTENT_TYPE" => "application/json"}

    assert_equal 204, last_response.status
  end
end
