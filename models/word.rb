class Word
  attr_reader :id
  attr_reader :name
  attr_reader :notes
  attr_reader :added_on
  attr_reader :user_id
  attr_reader :deleted

  def self.create(attributes)
    $db.transaction do
      $db[:words].insert(attributes)
    end
  end

  def self.find(id)
    result = $db[:words].where(id: id).first
    new(result) if result
  end

  def self.find_by_user_id(user_id)
    results = $db[:words].where(user_id: user_id)
    words = []
    results.each do |r|
      words << new(r)
    end
    words
  end

  def initialize(attributes)
    @id = attributes[:id]
    @user_id = attributes[:user_id]
    @name = attributes[:name]
    @notes = attributes[:notes]
    @added_on = attributes[:added_on]
    @deleted = attributes[:deleted]
  end

  def to_attributes
    {
      id: id,
      userId: user_id,
      name: name,
      notes: notes,
      addedOn: added_on,
      deleted: deleted
    }
  end

  def update(attributes)
    $db.transaction do
      $db[:words].where(id: self.id).update(attributes)
    end
  end
end
