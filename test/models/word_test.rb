require_relative '../test_helper'

test "creating a word" do
  user_id = User.create(username: "sean")
  word_id = Word.create(user_id: user_id, name: "hola", notes: "this is a greeting", added_on: "1359470665")
  word = Word.find(word_id)
  assert_equal "hola", word.name
  assert_equal "this is a greeting", word.notes
  assert_equal "1359470665", word.added_on
  assert_equal user_id, word.user_id
end

test "updating attributes" do
  user_id = User.create(username: "sean")
  word_id = Word.create(user_id: user_id, name: "hola", notes: "this is a greeting", added_on: "1359470665")
  word = Word.find(word_id)
  word.update(deleted: "true")
  word = Word.find(word_id)
  assert_equal word.deleted, "true"
end

test "find by user id" do
  user_id = User.create(username: "sean")
  Word.create(user_id: user_id, name: "hola", notes: "this is a greeting", added_on: "1359470665")
  Word.create(user_id: user_id, name: "adios", notes: "this means the opposite", added_on: "1359470665")
  words = Word.find_by_user_id(user_id)
  assert_equal 2, words.length
  assert_equal Word, words.last.class
end

test "to_attributes" do
  user_id = User.create(username: "sean")
  word_id = Word.create(user_id: user_id, name: "hola", notes: "this is a greeting", added_on: "1359470665", deleted: "true")
  word = Word.find(word_id)
  attributes = {id: word_id, userId: user_id, name: "hola", notes: "this is a greeting", addedOn: "1359470665", deleted: "true"}
  assert_equal attributes, word.to_attributes
end
