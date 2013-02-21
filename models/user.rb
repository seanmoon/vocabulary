class User
  attr_reader :id
  attr_reader :password_hash

  def self.create(attributes)
    $db[:users].insert(attributes)
  end

  def self.find_by_username(username)
    result = $db[:users].where(username: username).first
    new(result) if result
  end

  def initialize(attributes)
    @id = attributes[:id]
    @password_hash = attributes[:password_hash]
  end

  def words_json
    words = Word.find_by_user_id(id)
    words_attrs = words.collect(&:to_attributes)
    words_attrs.to_json
  end
end

