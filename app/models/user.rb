class User < ApplicationRecord
  has_many :roads, dependent: :destroy
end
