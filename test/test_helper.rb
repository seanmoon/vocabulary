require 'cuba/test'
require File.expand_path("../app", File.dirname(__FILE__))

prepare do
  $db.run("DELETE FROM words")
  $db.run("DELETE FROM users")
end
