class Story < ActiveRecord::Base
    belongs_to :user
    belongs_to :category
    has_many :comments
    
    validates :body, presence: true
    validates :category_id, presence: true
    
    acts_as_votable
    
    def self.scariest
        order(cached_votes_score: :desc).limit(5)
    end
    
    def self.random
        limit(5).order("RANDOM()")
    end
    
    def self.search(text)
        stories = Story.where("body LIKE ?", "%#{text}%") if text.present?
        return stories
    end
end