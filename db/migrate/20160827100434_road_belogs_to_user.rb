class RoadBelogsToUser < ActiveRecord::Migration[5.0]
  def change
    add_reference :roads, :user, index: true
  end
end
