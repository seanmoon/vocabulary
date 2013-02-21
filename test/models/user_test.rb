require_relative '../test_helper'

test "creating a user" do
  User.create(username: "sean")
  user = User.find_by_username("sean")
  assert user
end
